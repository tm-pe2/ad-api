/** source/routes/contracts.ts */
import express from 'express';
import controller from '../controller/contracts';
const router = express.Router();

router.get('/contracts', controller.getContracts);
router.get('/contract/:id', controller.getContract);
router.put('/updateContract', controller.updateContract);
router.delete('/deleteContract/:id', controller.deleteContract);
router.post('/addContract', controller.addContract);

export = router;