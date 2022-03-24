/** source/routes/clients.ts */
import express from 'express';
import controller from '../controller/clients';
const router = express.Router();

router.get('/clients', controller.getClients);
router.get('/client/:id', controller.getClient);
router.put('/updateClient/:id', controller.updateClient);
router.delete('/deleteClient/:id', controller.deleteClient);
router.post('/addClients', controller.addClient);

export = router;