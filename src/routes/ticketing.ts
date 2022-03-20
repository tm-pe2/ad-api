import express from 'express';
import controller from '../controller/ticketing';
const router = express.Router();

router.get("/tickets", controller.getTickets)
router.get("/tickets/user/:id", controller.getUser)

export = router;