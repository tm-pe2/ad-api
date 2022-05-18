import express from 'express';
import * as customerController from '../controllers/customer-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

//static routes
router.get('', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]),customerController.getAllCustomers);
router.get('/contracts', customerController.getCustomersContracts);

//parametrized routes
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),customerController.getCustomerById);
router.get('/:id/addresses',customerController.getCustomerByUserId);
router.get('/:id/contracts', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),customerController.getCustomerContractsByID);
router.post('/', customerController.addCustomer); //this is not protected so that new customers ca register
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]), customerController.updateCustomer);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]), customerController.DeleteCustomerById);

export = router;
