import express from 'express';
import * as supplierController from '../controllers/supplier-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/suppliers', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), supplierController.getAllSuppliers);
router.get('/suppliers/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), supplierController.getSupplierById);
router.post('/suppliers', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPLIER]), supplierController.addSupplier);
router.put('/suppliers', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPPLIER]), supplierController.updateSupplier);
router.delete('/suppliers/:id', auth.authenticate([UserRole.ADMIN]), supplierController.deleteSupplierById);

export = router;
