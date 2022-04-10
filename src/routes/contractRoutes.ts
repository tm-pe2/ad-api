/** source/routes/contracts.ts */
import express from 'express';
import * as ContractController from '../controllers/contractController';

const router = express.Router();

router.get('/contracts', ContractController.getAllContracts);
router.get('/contracts/:id', ContractController.getContractById);
router.put('/contracts', ContractController.updateContract);
router.delete('/contracts/:id', ContractController.deleteContractById);
router.post('/contracts', ContractController.addContract);

export = router;
