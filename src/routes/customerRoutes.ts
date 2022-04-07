/** source/routes/clients.ts */
import express from 'express';
import * as CustomerController from '../controllers/customerController';
const router = express.Router();

router.get('/customers', CustomerController.getAllCustomers);
router.get('/customers/:id', CustomerController.getCustomerById);
router.put('/customers/', CustomerController.updateCustomer);
router.delete('/customers/:id', CustomerController.DeleteCustomerById);
router.post('/customers', CustomerController.addCustomer);

export = router;
