import express from 'express';
import * as addressController from '../controllers/address-controller';

const router = express.Router();

router.get('/addresses', addressController.getAllAddresses);
router.get('/addresses/:id', addressController.getAddressById);
router.put('/addresses', addressController.updateAddress);
router.delete('/addresses/:id', addressController.deleteAddressById);
router.post('/addresses', addressController.addAddress);

export = router;
