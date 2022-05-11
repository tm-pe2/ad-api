import express from 'express';
import * as invoiceController from '../controllers/invoice-controller';

const router = express.Router();

router.get('/invoices', invoiceController.getAllInvoices);
router.put('/invoices', invoiceController.updateInvoice);
router.delete('/invoices/:id', invoiceController.deleteInvoiceById);
router.get('/invoices/overdue', invoiceController.getOverdueInvoices);
router.post('/invoices', invoiceController.addInvoice);
router.get('/invoices/:id', invoiceController.getInvoiceById);

export = router;
