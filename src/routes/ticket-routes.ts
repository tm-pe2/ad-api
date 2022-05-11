import express from 'express';
import * as ticketController from '../controllers/ticket-controller';
import * as auth from "../middleware/auth"

const router = express.Router();

router.get('/tickets', ticketController.getAllTickets);
router.get('/tickets/:id', ticketController.getTicketById);
router.put('/tickets', ticketController.updateTicket);
router.delete('/tickets/:id', ticketController.deleteTicketById);
router.post('/tickets', ticketController.addTicket);

export = router;
