import express from 'express';
import controller from '../controller/dashboard';
const router = express.Router();

router.get('/dashboard/user/:id', controller.getUser);

export = router;
