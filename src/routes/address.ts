/** source/routes/address.ts */
import express from 'express';
import controller from '../controller/address';
const router = express.Router();

router.get('/addresses', controller.getAddresses);
router.get('/addresses/:id', controller.getAddress);
router.put('/addresses', controller.updateAddress);
router.delete('/addresses/:id', controller.deleteAddress);
router.post('/addresses', controller.addAddress);

export = router;