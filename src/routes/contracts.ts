/** source/routes/contracts.ts */
import express from 'express';
import controller from '../controller/contracts';
const router = express.Router();

router.get('/contracts', controller.getContracts);
router.get('/contracts/:id', controller.getContract);
router.put('/contracts', controller.updateContract);
router.delete('/contracts/:id', controller.deleteContract);
router.post('/contracts', controller.addContract);

export = router;