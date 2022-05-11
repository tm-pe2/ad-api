import express from 'express';
import * as supplierController from '../controllers/supplier-controller';
import * as auth from "../middleware/auth"

const router = express.Router();

router.get('/suppliers', supplierController.getAllSuppliers);
router.get('/suppliers/:id', supplierController.getSupplierById);
router.put('/suppliers', supplierController.updateSupplier);
router.delete('/suppliers/:id', supplierController.deleteSupplierById);
router.post('/suppliers', supplierController.addSupplier);

export = router;
