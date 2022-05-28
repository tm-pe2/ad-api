import path from "path";
import * as invoiceService from "../services/invoice";
import * as consumptionService from "../services/consumption";
import * as meterService from "../services/meter";

import {Invoice} from "../classes/invoice";
import {Meter} from "../classes/meters";
import {InvoicePdf} from "../classes/invoice-pdf";
import {Consumption} from "../classes/consumption";

import {monthDiff} from "./generate-invoice-util";

const fs = require('fs');
const PDFDocument = require("pdfkit");
const resourcePath = path.join(path.resolve(__dirname), '..', 'resources');

let doc: typeof PDFDocument;

export const generatePdf = async (invoiceId: number) => {
    return new Promise<void> (async resolve => {
        const destinationPath = getPathToInvoiceFile(invoiceId);
        doc = null;
        doc = new PDFDocument({size: "A4", margin: 50});

        const invoicePdf: InvoicePdf = await invoiceService.getInvoicePdfData(invoiceId);

        if (invoicePdf !== undefined) {
            if (monthDiff(invoicePdf.period_start, invoicePdf.period_end) > 1) {
                const meterConsumptions = await getMeterConsumptions(invoicePdf);
                generateAnnualInvoicePdf(invoicePdf, meterConsumptions);
            } else {
                generateAdvanceInvoicePdf(invoicePdf);
            }

            doc.end();
            let b = doc.pipe(fs.createWriteStream(destinationPath));

            b.on('finish', resolve);
        }
    });
}

const getMeterConsumptions = async (invoicePdf: InvoicePdf) => {

    let meterConsumption: Map<Meter, Consumption> = new Map<Meter, Consumption>();

    const meters: Meter[] = await meterService.getMetersByContractId(invoicePdf.contract_id)

    for (const meter of meters) {
        const consumption: Consumption = await consumptionService.getConsumptionByMeterIdAndPeriod(meter.meter_id, invoicePdf.period_start, invoicePdf.period_end);

        meterConsumption.set(meter, consumption);
    }

    return meterConsumption;
}

export const fileExistsForInvoice = (invoiceId: number): boolean => {
    try {
        fs.accessSync(getPathToInvoiceFile(invoiceId), fs.F_OK);
        return true;
    }
    catch {
        return false;
    }
}

export const getPathToInvoiceFile = (invoiceId: number): string => {
    return path.join(resourcePath, 'invoice' + invoiceId + '.pdf');
}

const generateAnnualInvoicePdf = (invoicePdf: InvoicePdf, meterConsumptions: Map<Meter, Consumption>) => {
    const consumptionWithTax = (invoicePdf.price + invoicePdf.tax); //392.3304
    const totalAdvances = invoicePdf.estimated_consumption * 11 * invoicePdf.tariff_rate;
    const totalAdvancesWithTax = totalAdvances + (totalAdvances * 0.21);
    const endTotal = consumptionWithTax - totalAdvancesWithTax;

    generateHeader();
    generateCustomerInformation(invoicePdf, endTotal);
    generateInvoiceTableHeader();

    let i = 0;
    let baseInvoiceTablePosition = 360
    for (const meter of meterConsumptions.keys())
    {
        generateMeterRow(baseInvoiceTablePosition + i * 20, invoicePdf, meter.physical_id.toString(), meterConsumptions.get(meter)!);
        i++;
    }

    const baseAfterTablePosition = baseInvoiceTablePosition + i * 20;

    generateHr(baseAfterTablePosition);

    generateRowTax(baseAfterTablePosition + 10, invoicePdf.tax);

    generatePartialHr(400, 550, baseAfterTablePosition + 25);

    generateRowSubtotal(baseAfterTablePosition + 40, consumptionWithTax);
    generateRowAdvances(baseAfterTablePosition + 60, totalAdvancesWithTax);

    generatePartialHr(400, 550, baseAfterTablePosition + 75);

    generateRowAmountDue(baseAfterTablePosition + 90, invoicePdf, endTotal);
}

const generateAdvanceInvoicePdf = (invoicePdf: InvoicePdf) => {
    const advance = invoicePdf.estimated_consumption * invoicePdf.tariff_rate;
    const endTotal = advance + (advance * 0.21);

    generateHeader();
    generateCustomerInformation(invoicePdf, endTotal);
    generateInvoiceTableHeader();

    generateAdvanceTableRow(360, invoicePdf);

    generateHr(380);

    generateRowTax(390,invoicePdf.tax);
    generatePartialHr(400, 550, 405);

    generateRowAmountDue(415, invoicePdf, endTotal);
}

const generateHeader = () => {

    const logo = path.join(resourcePath, 'energies_logo.png');

    const baseY = 80;

    doc
        .fillColor("#444444")
        .fontSize(20)
        .image(logo, 20, 0, {width: 200})
        .fontSize(10)
        .text("Energies", 200, baseY, { align: "right" })
        .text("Jan Pieter De Nayerlaan 5", 200, baseY + 15, { align: "right" })
        .text("2860 Sint-Katelijne-Waver", 200, baseY + 30, { align: "right" })
        .moveDown();
}

const generateCustomerInformation = (invoicePdf: InvoicePdf, endTotal: number) => {
    const title: string = endTotal > 0 ? 'Invoice' : 'Credit Note';

    doc
        .fillColor("#444444")
        .fontSize(20)
        .text(title, 50, 180);

    generateHr(205);

    const customerInformationTop = 220;

    doc
        .fontSize(10)
        .text("Invoice number:", 50, customerInformationTop)
        .text(invoicePdf.invoice_id, 150, customerInformationTop)

        .text("Created on:", 50, customerInformationTop + 15)
        .text(invoicePdf.creation_date.toLocaleDateString(), 150, customerInformationTop + 15)

        .text("Period:", 50, customerInformationTop + 30)
        .text(
            invoicePdf.period_start.toLocaleDateString() + ' - ' + invoicePdf.period_end.toLocaleDateString(),
            150,
            customerInformationTop + 30
        )
        .font("Helvetica-Bold")
        .text("Date due:", 50, customerInformationTop + 45)
        .text(invoicePdf.due_date.toLocaleDateString(), 150, customerInformationTop + 45)

        .text(invoicePdf.first_name + ' ' + invoicePdf.last_name, 350, customerInformationTop + 10, { align: "right" })
        .font("Helvetica")
        .text(invoicePdf.street + ' ' + invoicePdf.house_number, 350, customerInformationTop + 25, { align: "right" })
        .text(
            invoicePdf.postal_code +
            ' ' +
            invoicePdf.city +
            ", " +
            invoicePdf.country,
            350,
            customerInformationTop + 40,
            { align: "right" }
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

const generateMeterRow = (position: number, invoicePdf: InvoicePdf, physicalId: string, consumption: Consumption) => {
    generateTableRow(
        position,
        '1',
        physicalId.toString(),
        invoicePdf.tariff_rate.toString(), //tariff rate
        consumption.consumption.toString(),
        formatCurrency(invoicePdf.tariff_rate * consumption.consumption),
        "right",
        0
    );
}

const generateAdvanceTableRow = (position: number, invoicePdf: InvoicePdf) => {
    generateTableRow(
        position,
        '1',
        'Advance',
        invoicePdf.tariff_rate.toString(),
        invoicePdf.estimated_consumption.toString(),
        formatCurrency(invoicePdf.tariff_rate * invoicePdf.estimated_consumption),
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

const generateRowAmountDue = (position: number, invoicePdf: InvoicePdf, endTotal: number) => {
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
    description:string,
    unitCost:string,
    quantity:string,
    lineTotal:string,
    quantityAlignment: string,
    quantityPaddingLeft: number
) => {
    doc
        .fontSize(10)
        .text(item, 50, y)
        .text(description, 150, y)
        .text(unitCost, 280, y, { width: 90, align: "right" })
        .text(quantity, 370 + quantityPaddingLeft, y, { width: 90, align: quantityAlignment })
        .text(lineTotal, 0, y, { align: "right" });
}

const generateHr = (y: number) => {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

const generatePartialHr = (fromX: number, toX: number, y: number, ) => {
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
