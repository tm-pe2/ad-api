import express from 'express';
import * as tariffController from '../controllers/tariff-controller';

const router = express.Router();

router.get('/tariffs', tariffController.getAllTariffs);
router.get('/tariffs/:id', tariffController.getTariffById);
router.put('/tariffs', tariffController.updateTariff);
router.delete('/tariffs/:id', tariffController.deleteTariffById);
router.post('/tariffs', tariffController.addTariff);

export = router;
