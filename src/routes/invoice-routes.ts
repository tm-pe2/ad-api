import express from 'express';
import * as invoiceController from '../controllers/invoice-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.ACCOUNTANT]), invoiceController.getAllInvoices);
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.ACCOUNTANT]), invoiceController.getInvoiceById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.ACCOUNTANT]), invoiceController.addInvoice);
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.ACCOUNTANT]), invoiceController.updateInvoice);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]), invoiceController.deleteInvoiceById);

export = router;
