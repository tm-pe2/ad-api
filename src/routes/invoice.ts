/** source/routes/invoices.ts */
import express from 'express';
import controller from '../controller/invoice';
const router = express.Router();

router.get('/invoices', controller.getInvoices);
router.get('/invoice/:id', controller.getInvoice);
router.put('/updateInvoice', controller.updateInvoice);
router.delete('/deleteInvoice/:id', controller.deleteInvoice);
router.post('/addInvoice', controller.addInvoice);

export = router;