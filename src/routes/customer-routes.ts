import express from 'express';
import * as customerController from '../controllers/customer-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();




//static routes
router.get('', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]),customerController.getAllCustomers);
router.get('/contracts', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]),customerController.getCustomersContracts);

//parametrized routes
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),customerController.getCustomerById);
router.get('/:id/contracts', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),customerController.getCustomerContractsByID);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]), customerController.addCustomer);
router.put('/:type', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]), customerController.updateCustomer);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]), customerController.DeleteCustomerById);

export = router;
