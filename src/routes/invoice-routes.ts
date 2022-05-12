import express from 'express';
import * as invoiceController from '../controllers/invoice-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

// router.get('/invoices', auth.authenticate([UserRole.ADMIN, UserRole.ACCOUNTANT]), invoiceController.getAllInvoices);
// router.get('/invoices/:id', auth.authenticate([UserRole.ADMIN, UserRole.ACCOUNTANT]), invoiceController.getInvoiceById);
// router.post('/invoices', auth.authenticate([UserRole.ADMIN, UserRole.ACCOUNTANT]), invoiceController.addInvoice);
// router.put('/invoices', auth.authenticate([UserRole.ADMIN, UserRole.ACCOUNTANT]), invoiceController.updateInvoice);
// router.delete('/invoices/:id', auth.authenticate([UserRole.ADMIN]), invoiceController.deleteInvoiceById);

router.get('/invoices', invoiceController.getAllInvoices);
router.get('/invoices/:id', invoiceController.getInvoiceById);
router.post('/invoices', invoiceController.addInvoice);
router.put('/invoices', invoiceController.updateInvoice);
router.delete('/invoices/:id', invoiceController.deleteInvoiceById);
export = router;
