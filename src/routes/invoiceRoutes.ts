/** source/routes/invoices.ts */
import express from 'express';
import * as InvoiceController from '../controllers/invoiceController';
const router = express.Router();

router.get('/invoices', InvoiceController.getAllInvoices);
router.get('/invoices/:id', InvoiceController.getInvoiceById);
router.put('/invoices', InvoiceController.updateInvoice);
router.delete('/invoices/:id', InvoiceController.deleteInvoiceById);
router.post('/invoices', InvoiceController.addInvoice);

export = router;
