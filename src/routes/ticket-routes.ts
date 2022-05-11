import express from 'express';
import * as ticketController from '../controllers/ticket-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/tickets', auth.authenticate([UserRole.ADMIN, UserRole.SUPPORT]), auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), ticketController.getAllTickets);
router.get('/tickets/:id', auth.authenticate([UserRole.ADMIN, UserRole.SUPPORT]), ticketController.getTicketById);
router.post('/tickets', auth.authenticate([UserRole.ADMIN, UserRole.SUPPORT, UserRole.CUSTOMER]), ticketController.addTicket);
router.put('/tickets', auth.authenticate([UserRole.ADMIN, UserRole.SUPPORT]), ticketController.updateTicket);
router.delete('/tickets/:id', auth.authenticate([UserRole.ADMIN]), ticketController.deleteTicketById);

export = router;
