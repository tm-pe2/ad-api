/** source/routes/clients.ts */
import express from 'express';
import controller from '../controller/auth';
const router = express.Router();

router.post('/login', controller.login);
// router.get('/client/:id', controller.getClient);

export = router;
