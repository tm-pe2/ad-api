import express from 'express';
import * as estimationController from '../controllers/estimation-controller';

const router = express.Router();

router.get('/estimations', estimationController.getAllEstimations);
router.get('/estimations/:id', estimationController.getEstimationById);
router.put('/estimations', estimationController.updateEstimation);
router.delete('/estimations/:id', estimationController.deleteEstimationById);
router.post('/estimations', estimationController.addEstimation);

export = router;
