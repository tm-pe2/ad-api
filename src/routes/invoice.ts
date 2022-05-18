/** source/routes/invoices.ts */
import express from 'express';
import controller from '../controller/invoice';
const router = express.Router();

router.get('/invoices', controller.getInvoices);
router.get('/invoices/:id', controller.getInvoice);
router.put('/invoices', controller.updateInvoice);
router.delete('/invoices/:id', controller.deleteInvoice);
router.post('/invoices', controller.addInvoice);

export = router;