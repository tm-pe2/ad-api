import express from 'express';
import controller from '../controller/ticketing';
const router = express.Router();

router.get("/tickets", controller.getTickets)

export = router;