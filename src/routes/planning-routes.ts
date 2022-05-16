import express from 'express';
import * as planningController from '../controllers/planning-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), planningController.getAllPlannings);
router.get('/employee/:id', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.MANAGER]), planningController.getPlanningByEmployeeId);
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), planningController.getPlanningById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), planningController.addPlanning);
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), planningController.updatePlanning);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]),  planningController.deletePlanningById);

export = router;
