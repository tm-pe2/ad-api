/** source/routes/clients.ts */
import express from 'express';
import controller from '../controller/customer';
const router = express.Router();

router.get('/customers', controller.getClients);
router.get('/customers/:id', controller.getClient);
router.put('/customers', controller.updateClient);
router.delete('/customers/:id', controller.deleteClient);
router.post('/customers', controller.addClient);

export = router;