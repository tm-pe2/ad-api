import express from 'express';
import * as meterController from '../controllers/meter-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/user';

const router = express.Router();

router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), meterController.getAllMeters);
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),meterController.getMeterById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.CUSTOMER]),meterController.addMeter);
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER, UserRole.CUSTOMER]),meterController.updateMeter);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]), meterController.deleteMeterById);

export = router;
