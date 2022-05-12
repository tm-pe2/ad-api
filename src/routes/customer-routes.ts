import express from 'express';
import * as customerController from '../controllers/customer-controller';

const router = express.Router();

//static routes
router.get('/customers', customerController.getAllCustomers);
router.get('/customers/contracts', customerController.getCustomersContracts);

//parametrized routes
router.get('/customers/:id', customerController.getCustomerById);
router.put('/customers', customerController.updateCustomer);
router.delete('/customers/:id', customerController.DeleteCustomerById);
router.post('/customers', customerController.addCustomer);

export = router;
