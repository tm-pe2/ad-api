import express from 'express';
import * as addressController from '../controllers/address-controller';
import { UserRole } from '../models/userrole';
import * as auth from "../middleware/auth"

const router = express.Router();

//router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]),addressController.getAllAddresses);
// router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.CUSTOMER]),addressController.getAddressById);
router.get('/', addressController.getAllAddresses);
router.get('/:id',addressController.getAddressById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]),addressController.addAddress);
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),addressController.updateAddress);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]), addressController.deleteAddressById);

export = router;
