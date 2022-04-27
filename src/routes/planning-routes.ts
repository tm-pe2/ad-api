import express from 'express';
import * as planningController from '../controllers/planning-controller';

const router = express.Router();

router.get('/plannings', planningController.getAllPlannings);
router.get('/plannings/:id', planningController.getPlanningById);
router.put('/plannings', planningController.updatePlanning);
router.delete('/plannings/:id', planningController.deletePlanningById);
router.post('/plannings', planningController.addPlanning);

export = router;
