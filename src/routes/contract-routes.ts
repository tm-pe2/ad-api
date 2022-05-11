import express from 'express';
import * as contractController from '../controllers/contract-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/contracts', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), contractController.getAllContracts);
router.get('/contracts/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),contractController.getContractById);
router.post('/contracts', contractController.addContract);
router.put('/contracts', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),contractController.updateContract);
router.delete('/contracts/:id', auth.authenticate([UserRole.ADMIN]), contractController.deleteContractById);

export = router;
