import path from "path";
import {AnnualInvoicePdf} from "../classes/annual-invoice-pdf";
import * as invoiceService from "../services/invoice-service";
import {getInvoiceType} from "../services/invoice-service";
import {AdvanceInvoicePdf} from "../classes/advance-invoice-pdf";
import {InvoicePdf} from "../classes/invoice-pdf";

const fs = require('fs');
const PDFDocument = require("pdfkit");
const resourcePath = path.join(path.resolve(__dirname), '..', 'resources');

let doc = new PDFDocument({size: "A4", margin: 50});

export const generatePdf = async (invoiceId: number) => {
    return new Promise<void> (async resolve => {
        const destinationPath = getPathToInvoiceFile(invoiceId);

        const type: string = await getInvoiceType(invoiceId)
        if (type === 'Annual') {
            const pdfData: AnnualInvoicePdf = await invoiceService.getAnnualInvoicePdfData(invoiceId);

            generateAnnualInvoicePdf(pdfData);
        } else {
            const pdfData: AdvanceInvoicePdf = await invoiceService.getAdvanceInvoicePdfData(invoiceId);
            // generate advance invoice
        }

        doc.end();
        let b = doc.pipe(fs.createWriteStream(destinationPath));

        b.on('finish', resolve);
    });
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

const generateAnnualInvoicePdf = (pdfData: AnnualInvoicePdf) => {
    generateHeader();
    generateCustomerInformation(pdfData);

    generateInvoiceTableHeader(pdfData);
    generateRowElectricityConsumption(360, pdfData)
    generateHr(380);

    generateRowAdvances(390, pdfData);
    generatePartialHr(400, 550, 405);

    generateRowAmountDue(415, pdfData);
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

const generateCustomerInformation = (invoicePdf: InvoicePdf) => {
    let title = '';
    let label = '';

    if (invoicePdf.price > 0) {
        title = "Invoice";
        label = "Balance due";
    }
    else
    {
        title = "Credit Note";
        label = "Credit Note Total:"
    }

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
            invoicePdf.start_date.toLocaleDateString() + ' - ' + invoicePdf.end_date.toLocaleDateString(),
            150,
            customerInformationTop + 30
        )

        .font("Helvetica-Bold")
        .text(label, 50, customerInformationTop + 45)
        .text(
            formatCurrency(invoicePdf.price),
            150,
            customerInformationTop + 45
        )

        .text("Date due:", 50, customerInformationTop + 60)
        .text(invoicePdf.due_date.toLocaleDateString(), 150, customerInformationTop + 60)

        .font("Helvetica-Bold")
        .text(invoicePdf.first_name + ' ' + invoicePdf.last_name, 350, customerInformationTop + 15, { align: "right" })
        .font("Helvetica")
        .text(invoicePdf.street + ' ' + invoicePdf.house_number, 350, customerInformationTop + 30, { align: "right" })
        .text(
            invoicePdf.postal_code +
            ' ' +
            invoicePdf.city +
            ", " +
            invoicePdf.country,
            350,
            customerInformationTop + 45,
            { align: "right" }
        )
        .moveDown();

    generateHr(customerInformationTop + 80);
}

const generateInvoiceTableHeader = (invoicePdf: InvoicePdf) => {
    let i;
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

const generateRowElectricityConsumption = (position: number, pdfData: AnnualInvoicePdf) => {
    generateTableRow(
        position,
        '1',
        'Electricity consumption',
        pdfData.value.toString(), //tariff rate
        "{actual_cons}",//pdfData.actual_consumption.toString(),
        formatCurrency(pdfData.actual_consumption * pdfData.value),
        "right",
        0
    );
}

const generateRowAdvances = (position: number, pdfData: AnnualInvoicePdf) => {
    generateTableRow(
        position,
        "",
        "",
        "",
        "Advances",
        '- ' + formatCurrency(pdfData.advances_paid),
        "left",
        30
    );
}

const generateRowAmountDue = (position: number, pdfData: AnnualInvoicePdf) => {
    const label = pdfData.price > 0 ? "Balance Due" : "Credit Note Total";

    doc.font("Helvetica-Bold");
    generateTableRow(
        position,
        "",
        "",
        " ",
        label,
        formatCurrency(pdfData.price),
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
