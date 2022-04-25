/** source/routes/clients.ts */
import express from 'express';
import controller from '../controller/auth';
const router = express.Router();

router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/token', controller.refreshToken);  

export = router;
