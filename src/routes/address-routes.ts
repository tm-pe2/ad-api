import express from 'express';
import * as addressController from '../controllers/address-controller';
import { UserRole } from '../models/userrole';
import * as auth from "../middleware/auth"

const router = express.Router();

router.get('/addresses', addressController.getAllAddresses);
router.get('/addresses/:id', addressController.getAddressById);
router.post('/addresses', addressController.addAddress);
router.put('/addresses', addressController.updateAddress);
router.delete('/addresses/:id', addressController.deleteAddressById);

export = router;
