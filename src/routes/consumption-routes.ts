import express from 'express';
import * as consumptionController from '../controllers/consumption-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), consumptionController.getAllConsumptions);
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), consumptionController.getConsumptionById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), consumptionController.addConsumption);
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), consumptionController.updateConsumption);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]), consumptionController.deleteConsumptionById);

export = router;
