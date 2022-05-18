import express from 'express';
import * as contractController from '../controllers/contract-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), contractController.getAllContracts);
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),contractController.getContractById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.CUSTOMER]),contractController.addContract);
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),contractController.updateContract);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]), contractController.deleteContractById);


export = router;
