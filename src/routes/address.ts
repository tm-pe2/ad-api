/** source/routes/address.ts */
import express from 'express';
import controller from '../controller/address';
const router = express.Router();

router.get('/addresses', controller.getAddresses);
router.get('/address/:id', controller.getAddress);
router.put('/updateAddress', controller.updateAddress);
router.delete('/deleteAddress/:id', controller.deleteAddress);
router.post('/addAddress', controller.addAddress);

export = router;