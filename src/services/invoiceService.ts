import { execute } from "../utils/mysql.connector";
import { Invoice } from "../classes/invoice";
import { InvoiceQueries } from "../queries/invoiceQueries";

 export const getAllInvoices = async () => {
     return execute<Invoice[]>(InvoiceQueries.getAllInvoices, []);
  };

 export const getInvoiceById = async (id: Invoice['InvoiceID']) => {
     return execute<Invoice>(InvoiceQueries.getInvoiceById, [id]);
  };
  
  export const insertInvoice = async (invoice: Invoice) => {
      const result = await execute<{ affectedRows: number }>(InvoiceQueries.addInvoice, [invoice]);
      return result.affectedRows > 0;
  };

  export const updateInvoice = async (invoice: Invoice) => {
      const result = await execute<{ affectedRows: number }>(InvoiceQueries.updateInvoice, [
          invoice.getClientID,
          invoice.getSupplierID,
          invoice.getDate,
          invoice.getDueDate,
          invoice.getType,
          invoice.getAmount,
          invoice.getPrice,
          invoice.getTax,
          invoice.getStatus,
          invoice.getInvoiceID
      ]);
      return result.affectedRows > 0;
  };
  
   export const deleteInvoiceById = async (id: Invoice['InvoiceID']) => {
       const result = await execute<{ affectedRows: number }>(InvoiceQueries.deleteInvoiceById, [id]);
    return result.affectedRows > 0;
  };
