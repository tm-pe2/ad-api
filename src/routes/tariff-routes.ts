import express from 'express';
import * as tariffController from '../controllers/tariff-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), tariffController.getAllTariffs);
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), tariffController.getTariffById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), tariffController.addTariff);
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), tariffController.updateTariff);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]), tariffController.deleteTariffById);

export = router;
