import path from "path";
import {getInvoiceById} from "../services/invoice";
import {getConsumptionsByContractId} from "../services/consumption";
import {Invoice, INVOICE_TYPE} from "../models/invoice";
import {connectClient} from "./database-connector";
import {Consumption} from "../models/consumption";
import {Estimation} from "../models/estimation";
import {getEstimationById} from "../services/estimation";
import {getContractById} from "../services/contract";
import {Contract} from "../models/contract";
import PDFDocument from 'pdfkit'
const fs = require('fs');
const resourcePath = path.join(path.resolve(__dirname), '..', 'resources');

let doc: typeof PDFDocument;

export const generatePdf = async (invoiceId: number) => {
    return new Promise<void>(async resolve => {
        const client = await connectClient();
        const destinationPath = getPathToInvoiceFile(invoiceId);
        doc = new PDFDocument({size: "A4", margin: 50});

        const invoice: any | null = await getInvoiceById(client, invoiceId);

        if (!invoice) {
            throw new Error('Could not find invoice');
        }

        const contract: Contract | null = await getContractById(client, invoice.contract_id);
        if (!contract) {
            throw new Error('Could not find contract');
        }

        const estimation: Estimation | null = await getEstimationById(client, contract.estimation_id);
        if (!estimation) {
            throw new Error('Could not find estimation');
        }

        if (invoice.type == INVOICE_TYPE.ADVANCE) {

            generateAdvanceInvoicePdf(invoice, contract, estimation);
        } else {
            const consumptions: Consumption [] | null = await getConsumptionsByContractId(client, invoice.contract_id);
            if (!consumptions) {
                throw new Error('Could not find consumption');
            }
            generateAnnualInvoicePdf(invoice, contract, estimation, consumptions);
        }

        client.release();
        doc.end();
        let b = doc.pipe(fs.createWriteStream(destinationPath));

        b.on('finish', resolve);
    });
}

export const fileExistsForInvoice = (invoiceId: number): boolean => {
    try {
        fs.accessSync(getPathToInvoiceFile(invoiceId), fs.constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

export const getPathToInvoiceFile = (invoiceId: number): string => {
    return path.join(resourcePath, 'invoice' + invoiceId + '.pdf');
}

const generateAnnualInvoicePdf = (invoice: any, contract: Contract, estimation: Estimation, consumptions: Consumption[]) => {
    const consumptionWithTax = (invoice.price + invoice.tax);
    const totalAdvances = estimation.estimated_consumption * 11 * contract.tariff.value;
    const totalAdvancesWithTax = totalAdvances + (totalAdvances * 0.21);
    const endTotal = consumptionWithTax - totalAdvancesWithTax;

    generateHeader();
    generateCustomerInformation(invoice, endTotal);
    generateInvoiceTableHeader();

    let i = 0;
    let baseInvoiceTablePosition = 360
    for (const consumption of consumptions) {
        generateMeterRow(baseInvoiceTablePosition + i * 20, i + 1, contract, consumption);
        i++;
    }

    const baseAfterTablePosition = baseInvoiceTablePosition + i * 20;

    generateHr(baseAfterTablePosition);

    generateRowTax(baseAfterTablePosition + 10, invoice.tax);

    generatePartialHr(400, 550, baseAfterTablePosition + 25);

    generateRowSubtotal(baseAfterTablePosition + 40, consumptionWithTax);
    generateRowAdvances(baseAfterTablePosition + 60, totalAdvancesWithTax);

    generatePartialHr(400, 550, baseAfterTablePosition + 75);

    generateRowAmountDue(baseAfterTablePosition + 90, endTotal);
}

const generateAdvanceInvoicePdf = (invoice: any, contract: Contract, estimation: Estimation) => {
    const advance = estimation.estimated_consumption * contract.tariff.value;
    const endTotal = advance + (advance * 0.21);

    generateHeader();
    generateCustomerInformation(invoice, endTotal);
    generateInvoiceTableHeader();

    generateAdvanceTableRow(360, contract.tariff.value, estimation.estimated_consumption);

    generateHr(380);

    generateRowTax(390, invoice.tax);
    generatePartialHr(400, 550, 405);

    generateRowAmountDue(415, endTotal);
}

const generateHeader = () => {

    const logo = path.join(resourcePath, 'energies_logo.png');

    const baseY = 80;

    doc
        .fillColor("#444444")
        .fontSize(20)
        .image(logo, 20, 0, {width: 200})
        .fontSize(10)
        .text("Energies", 200, baseY, {align: "right"})
        .text("Jan Pieter De Nayerlaan 5", 200, baseY + 15, {align: "right"})
        .text("2860 Sint-Katelijne-Waver", 200, baseY + 30, {align: "right"})
        .moveDown();
}

const generateCustomerInformation = (invoice: any, endTotal: number) => {
    const title: string = invoice.type == INVOICE_TYPE.DEBIT || invoice.type == INVOICE_TYPE.ADVANCE ? 'Invoice' : 'Credit Note';

    doc
        .fillColor("#444444")
        .fontSize(20)
        .text(title, 50, 180);

    generateHr(205);

    const customerInformationTop = 220;

    doc
        .fontSize(10)
        .text("Invoice number:", 50, customerInformationTop)
        .text(invoice.id, 150, customerInformationTop)

        .text("Created on:", 50, customerInformationTop + 15)
        .text(invoice.creation_date.toLocaleDateString(), 150, customerInformationTop + 15)

        .text("Period:", 50, customerInformationTop + 30)
        .text(
            invoice.period_start.toLocaleDateString() + ' - ' + invoice.period_end.toLocaleDateString(),
            150,
            customerInformationTop + 30
        )
        .font("Helvetica-Bold")
        .text("Date due:", 50, customerInformationTop + 45)
        .text(invoice.due_date.toLocaleDateString(), 150, customerInformationTop + 45)

        .text(invoice.customer?.first_name + ' ' + invoice.customer?.last_name, 350, customerInformationTop + 10, {align: "right"})
        .font("Helvetica")
        .text(invoice.address?.street + ' ' + invoice.address?.house_number, 350, customerInformationTop + 25, {align: "right"})
        .text(
            invoice.address.postal_code +
            ' ' +
            invoice.address.city_name +
            ", " +
            invoice.address?.country,
            350,
            customerInformationTop + 40,
            {align: "right"}
        )
        .moveDown();

    generateHr(customerInformationTop + 70);
}

const generateInvoiceTableHeader = () => {
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
        invoiceTableTop,
        "Item",
        "Description",
        "Unit price",
        "Quantity",
        "Total",
        "right",
        0
    );
    generateHr(invoiceTableTop + 20);
    doc.font("Helvetica");
}

const generateMeterRow = (position: number, index: number, contract: Contract, consumption: Consumption) => {
    generateTableRow(
        position,
        index.toString(),
        consumption.meter.meter_type.toString() + ' meter [' + consumption.meter.physical_id + ']',
        contract.tariff.value.toString(),
        consumption.consumed_value.toString(),
        formatCurrency(contract.tariff.value * consumption.consumed_value),
        "right",
        0
    );
}

const generateAdvanceTableRow = (position: number, tariffValue: number, estimatedConsumption: number) => {
    generateTableRow(
        position,
        '1',
        'Advance',
        tariffValue.toString(),
        estimatedConsumption.toString(),
        formatCurrency(tariffValue * estimatedConsumption),
        "right",
        0
    );
}

const generateRowAdvances = (position: number, totalAdvancesWithTax: number) => {

    generateTableRow(
        position,
        "",
        "",
        "",
        "Advances",
        '- ' + formatCurrency(totalAdvancesWithTax),
        "left",
        30
    );
}

const generateRowTax = (position: number, tax: number) => {

    doc.font("Helvetica");
    generateTableRow(
        position,
        "",
        "",
        " ",
        'Tax',
        '+ ' + formatCurrency(tax),
        "left",
        30
    );
    doc.font("Helvetica");
}

const generateRowSubtotal = (position: number, subTotal: number) => {

    doc.font("Helvetica");
    generateTableRow(
        position,
        "",
        "",
        " ",
        'Subtotal',
        formatCurrency(subTotal),
        "left",
        30
    );
    doc.font("Helvetica");
}

const generateRowAmountDue = (position: number, endTotal: number) => {
    const label = endTotal > 0 ? "Balance Due" : "Credit Note Total";

    doc.font("Helvetica-Bold");
    generateTableRow(
        position,
        "",
        "",
        " ",
        label,
        formatCurrency(endTotal),
        "left",
        30
    );
    doc.font("Helvetica");
}

const generateTableRow = (
    y: number,
    item: string,
    description: string,
    unitCost: string,
    quantity: string,
    lineTotal: string,
    quantityAlignment: string,
    quantityPaddingLeft: number
) => {
    doc
        .fontSize(10)
        .text(item, 50, y)
        .text(description, 150, y)
        .text(unitCost, 280, y, {width: 90, align: "right"})
        .text(quantity, 370 + quantityPaddingLeft, y, {width: 90, align: quantityAlignment})
        .text(lineTotal, 0, y, {align: "right"});
}

const generateHr = (y: number) => {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

const generatePartialHr = (fromX: number, toX: number, y: number,) => {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(fromX, y)
        .lineTo(toX, y)
        .stroke();
}

const formatCurrency = (currency: number) => {
    return currency > 0 ? "€ " + numberWithCommas(currency.toFixed(2)) : "- € " + numberWithCommas(Math.abs(currency).toFixed(2));
}

const numberWithCommas = (x: string) => {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
