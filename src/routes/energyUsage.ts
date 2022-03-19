import express from 'express';
import controller from '../controller/energyUsage';
const router = express.Router();

router.get('/energyUsage/:id', controller.getUsage);

export = router;