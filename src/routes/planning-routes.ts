import express from 'express';
import * as planningController from '../controllers/planning-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/plannings', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), planningController.getAllPlannings);
router.get('/plannings/employee/:id', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER, UserRole.MANAGER]), planningController.getPlanningByEmployeeId);
router.get('/plannings/:id', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), planningController.getPlanningById);
router.post('/plannings', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), planningController.addPlanning);
router.put('/plannings', auth.authenticate([UserRole.ADMIN, UserRole.HR_MANAGER]), planningController.updatePlanning);
router.delete('/plannings/:id', auth.authenticate([UserRole.ADMIN]),  planningController.deletePlanningById);

export = router;
