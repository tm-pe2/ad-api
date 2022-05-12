import express from 'express';
import * as addressController from '../controllers/address-controller';
import { UserRole } from '../models/userrole';
import * as auth from "../middleware/auth"

const router = express.Router();

router.get('/addresses', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]),addressController.getAllAddresses);
router.get('/addresses/:id', auth.authenticate([UserRole.ADMIN, UserRole.CUSTOMER]),addressController.getAddressById);
router.post('/addresses', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]),addressController.addAddress);
router.put('/addresses', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),addressController.updateAddress);
router.delete('/addresses/:id', auth.authenticate([UserRole.ADMIN]), addressController.deleteAddressById);

export = router;
