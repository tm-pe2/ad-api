/** source/routes/clients.ts */
import express from 'express';
import controller from '../controller/clients';
const router = express.Router();

router.get('/clients', controller.getClients);
router.get('/client/:id', controller.getClient);
router.put('/clients/:id', controller.updateClient);
router.delete('/clients/:id', controller.deleteClient);
router.post('/clients', controller.addClient);

export = router;