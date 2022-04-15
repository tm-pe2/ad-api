import express from 'express';
import * as customerController from '../controllers/customer-controller';

const router = express.Router();

router.get('/customers', customerController.getAllCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.put('/customers/', customerController.updateCustomer);
router.delete('/customers/:id', customerController.DeleteCustomerById);
router.post('/customers', customerController.addCustomer);

export = router;
