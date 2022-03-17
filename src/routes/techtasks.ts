import express from 'express';
import controller from '../controller/techtasks';
const router = express.Router();

router.get("/techtasks", controller.GetTasks)

export = router;