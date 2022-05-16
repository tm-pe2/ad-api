import express from 'express';
import * as contractController from '../controllers/contract-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

// router.get('/contracts', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), contractController.getAllContracts);
// router.get('/contracts/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),contractController.getContractById);
// router.post('/contracts', auth.authenticate([UserRole.ADMIN, UserRole.CUSTOMER]),contractController.addContract);
// router.put('/contracts', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),contractController.updateContract);
// router.delete('/contracts/:id', auth.authenticate([UserRole.ADMIN]), contractController.deleteContractById);

router.get('/contracts', contractController.getAllContracts);
router.get('/contracts/:id', contractController.getContractById);
router.post('/contracts', contractController.addContract);
router.put('/contracts', contractController.updateContract);
router.delete('/contracts/:id', contractController.deleteContractById);

export = router;
