// import {InvoicePdf} from "../classes/invoice-pdf";
// import path from "path";
//
// const fs = require('fs');
// const PDFDocument = require("pdfkit");
// const resourcePath = path.join(path.resolve(__dirname), '..', 'resources');
////TODO: update for new database + annual/advance invoice
// export const generateYearlyInvoicePdf = async (invoicePdf: InvoicePdf, invoiceType: InvoiceType): Promise<void> => {
//     return new Promise<void>(resolve => {
//         let doc = new PDFDocument({ size: "A4", margin: 50 });
//         const destinationPath = getPathToInvoiceFile(invoicePdf.invoice_id);
//
//         //TODO: Subtract advance payments
//         //TODO: Use invoiceType
//
//         generateHeader(doc);
//         generateCustomerInformation(doc, invoicePdf);
//         generateInvoiceTable(doc, invoicePdf, invoiceType);
//         generateFooter(doc);
//
//         doc.end();
//         let b = doc.pipe(fs.createWriteStream(destinationPath));
//
//         b.on('finish', resolve);
//     });
// }
//
// export function fileExistsForInvoice(invoiceId: number): boolean  {
//     try {
//         fs.accessSync(getPathToInvoiceFile(invoiceId), fs.F_OK);
//         return true;
//     }
//     catch {
//         return false;
//     }
// }
//
// export function getPathToInvoiceFile(invoiceId: number): string {
//     return path.join(resourcePath, 'invoice' + invoiceId + '.pdf');
// }
//
// function generateHeader(doc: typeof PDFDocument) {
//     doc
//         .fillColor("#444444")
//         .fontSize(20)
//         .text("Energy Company", 110, 57)
//         .fontSize(10)
//         .text("Energy company.", 200, 50, { align: "right" })
//         .text("Jan Pieter De Nayerlaan 5", 200, 65, { align: "right" })
//         .text("2860 Sint-Katelijne-Waver", 200, 80, { align: "right" })
//         .moveDown();
// }
//
// function generateCustomerInformation(doc: typeof PDFDocument, invoicePdf: InvoicePdf) {
//     doc
//         .fillColor("#444444")
//         .fontSize(20)
//         .text("Invoice", 50, 160);
//
//     generateHr(doc, 185);
//
//     const customerInformationTop = 200;
//
//     doc
//         .fontSize(10)
//         .text("Invoice number:", 50, customerInformationTop)
//         .text(invoicePdf.invoice_id, 150, customerInformationTop)
//         .text("Created on:", 50, customerInformationTop + 15)
//         .text(invoicePdf.Date.toLocaleDateString(), 150, customerInformationTop + 15)
//         .font("Helvetica-Bold")
//         .text("Amount due", 50, customerInformationTop + 30)
//         .text(
//             formatCurrency(invoicePdf.Price + invoicePdf.Tax),
//             150,
//             customerInformationTop + 30
//         )
//
//         .text("Date due:", 50, customerInformationTop + 45)
//         .text(invoicePdf.DueDate.toLocaleDateString(), 150, customerInformationTop + 45)
//
//         .font("Helvetica-Bold")
//         .text(invoicePdf.FirstName + ' ' + invoicePdf.LastName, 350, customerInformationTop)
//         .font("Helvetica")
//         .text(invoicePdf.Street + ' ' + invoicePdf.HouseNumber, 350, customerInformationTop + 15)
//         .text(
//             invoicePdf.PostalCode +
//             ' ' +
//             invoicePdf.City +
//             ", " +
//             invoicePdf.Country,
//             350,
//             customerInformationTop + 30
//         )
//         .moveDown();
//
//     generateHr(doc, 267);
// }
//
// function generateInvoiceTable(doc: typeof PDFDocument, invoicePdf: InvoicePdf, invoiceType: InvoiceType) {
//     let i;
//     const invoiceTableTop = 330;
//
//     doc.font("Helvetica-Bold");
//     generateTableRow(
//         doc,
//         invoiceTableTop,
//         "Item",
//         "Description",
//         "Unit price",
//         "Quantity",
//         "Total"
//     );
//     generateHr(doc, invoiceTableTop + 20);
//     doc.font("Helvetica");
//
//     for (i = 0; i < 2; i++) {
//         const position = invoiceTableTop + (i + 1) * 30;
//
//         if (i == 0)
//         {
//             generateTableRow(
//                 doc,
//                 position,
//                 (i + 1).toString(),
//                 'Electricity',
//                 "",
//                 invoicePdf.GasAmount.toString(),
//                 formatCurrency(invoicePdf.Price)
//             );//invoicePdf.ElectricityType.toString(),
//         }
//         else
//         {
//             generateTableRow(
//                 doc,
//                 position,
//                 (i + 1).toString(),
//                 "Tax",
//                 "",
//                 "",
//                 formatCurrency(invoicePdf.Tax)
//             );
//         }
//         generateHr(doc, position + 20);
//     }
//
//     const subtotalPosition = invoiceTableTop + (i + 1) * 30;
//     generateTableRow(
//         doc,
//         subtotalPosition,
//         "",
//         "",
//         "Subtotal",
//         "",
//         formatCurrency(invoicePdf.Price + invoicePdf.Tax)
//     );
//
//     const paidToDatePosition = subtotalPosition + 20;
//     generateTableRow(
//         doc,
//         paidToDatePosition,
//         "",
//         "",
//         "Advances paid",
//         "",
//         '- ' + formatCurrency(0)
//     );
//
//     const duePosition = paidToDatePosition + 25;
//     doc.font("Helvetica-Bold");
//     generateTableRow(
//         doc,
//         duePosition,
//         "",
//         "",
//         "Balance Due",
//         "",
//         formatCurrency(invoicePdf.Price + invoicePdf.Tax)
//     );
//     doc.font("Helvetica");
// }
//
// function generateFooter(doc: typeof PDFDocument) {
//     doc
//         .fontSize(10)
//         .text(
//             "",
//             50,
//             780,
//             { align: "center", width: 500 }
//         );
// }
//
// function generateTableRow(
//     doc: typeof PDFDocument,
//     y: number,
//     item: string,
//     description:string,
//     unitCost:string,
//     quantity:string,
//     lineTotal:string
// ) {
//     doc
//         .fontSize(10)
//         .text(item, 50, y)
//         .text(description, 150, y)
//         .text(unitCost, 280, y, { width: 90, align: "right" })
//         .text(quantity, 370, y, { width: 90, align: "right" })
//         .text(lineTotal, 0, y, { align: "right" });
// }
//
// function generateHr(doc: typeof PDFDocument, y: number) {
//     doc
//         .strokeColor("#aaaaaa")
//         .lineWidth(1)
//         .moveTo(50, y)
//         .lineTo(550, y)
//         .stroke();
// }
//
// function formatCurrency(currency: number) {
//     return "€ " + currency.toFixed(2);
// }
