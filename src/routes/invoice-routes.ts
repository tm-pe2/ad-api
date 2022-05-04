import express from 'express';
import * as invoiceController from '../controllers/invoice-controller';

const router = express.Router();

router.get('/invoices', invoiceController.getAllInvoices);
router.get('/invoices/:id', invoiceController.getInvoiceById);
router.put('/invoices', invoiceController.updateInvoice);
router.delete('/invoices/:id', invoiceController.deleteInvoiceById);
router.post('/invoices', invoiceController.addInvoice);

export = router;
