import express from 'express';
import * as customerController from '../controllers/customer-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

// //static routes
// router.get('/customers', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), customerController.getAllCustomers);
// router.get('/customers/contracts', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]),customerController.getCustomersContracts);

// //parametrized routes
// router.get('/customers/:id',customerController.getCustomerById);
// router.get('/customers/:id/contracts', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),customerController.getCustomerContractsByID);
// router.post('/customers', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]), customerController.addCustomer);
// router.put('/customers', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]), customerController.updateCustomer);
// router.delete('/customers/:id', auth.authenticate([UserRole.ADMIN]), customerController.DeleteCustomerById);


//static routes
router.get('/customers', customerController.getAllCustomers);
router.get('/customers/contracts', customerController.getCustomersContracts);

//parametrized routes
router.get('/customers/:id',customerController.getCustomerById);
router.get('/customers/:id/contracts', customerController.getCustomerContractsByID);
router.post('/customers',  customerController.addCustomer);
router.put('/customers',  customerController.updateCustomer);
router.delete('/customers/:id', customerController.DeleteCustomerById);

export = router;
