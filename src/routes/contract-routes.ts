/** source/routes/contracts.ts */
import express from 'express';
import * as contractController from '../controllers/contract-controller';

const router = express.Router();

router.get('/contracts', contractController.getAllContracts);
router.get('/contracts/:id', contractController.getContractById);
router.put('/contracts', contractController.updateContract);
router.delete('/contracts/:id', contractController.deleteContractById);
router.post('/contracts', contractController.addContract);

export = router;
