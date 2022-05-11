import express from 'express';
import * as planningController from '../controllers/planning-controller';
import { route } from './customer-routes';

const router = express.Router();

router.get('/plannings', planningController.getAllPlannings);
router.get('/plannings/employee/:id', planningController.getPlanningByEmployeeId);
router.get('/plannings/:id', planningController.getPlanningById);
router.put('/plannings', planningController.updatePlanning);
router.delete('/plannings/:id', planningController.deletePlanningById);
router.post('/plannings', planningController.addPlanning);

export = router;
