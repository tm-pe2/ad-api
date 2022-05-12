import express from 'express';
import * as estimationController from '../controllers/estimation-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/estimations', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]),estimationController.getAllEstimations);
router.get('/estimations/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), estimationController.getEstimationById);
router.post('/estimations', auth.authenticate([UserRole.ADMIN, UserRole.CUSTOMER]), estimationController.addEstimation);
router.put('/estimations', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN]), estimationController.updateEstimation);
router.delete('/estimations/:id', auth.authenticate([UserRole.ADMIN]), estimationController.deleteEstimationById);

export = router;
