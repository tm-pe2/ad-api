import express from 'express';
import * as estimationController from '../controllers/estimation-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]),estimationController.getAllEstimations);
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), estimationController.getEstimationById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.CUSTOMER]), estimationController.addEstimation);
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN]), estimationController.updateEstimation);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]), estimationController.deleteEstimationById);

export = router;
