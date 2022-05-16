import express from 'express';
import * as tariffController from '../controllers/tariff-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

// router.get('/tariffs', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), tariffController.getAllTariffs);
// router.get('/tariffs/:id', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), tariffController.getTariffById);
// router.post('/tariffs', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), tariffController.addTariff);
// router.put('/tariffs', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), tariffController.updateTariff);
// router.delete('/tariffs/:id', auth.authenticate([UserRole.ADMIN]), tariffController.deleteTariffById);
router.get('/tariffs', tariffController.getAllTariffs);
router.get('/tariffs/:id', tariffController.getTariffById);
router.post('/tariffs', tariffController.addTariff);
router.put('/tariffs', tariffController.updateTariff);
router.delete('/tariffs/:id', tariffController.deleteTariffById);

export = router;
