import express from 'express';
import * as ticketController from '../controllers/ticket-controller';
import * as auth from "../middleware/auth";
import { UserRole } from '../models/userrole';

const router = express.Router();

router.get('/', auth.authenticate([UserRole.ADMIN, UserRole.SUPPORT]), auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), ticketController.getAllTickets);
router.get('/:id', auth.authenticate([UserRole.ADMIN, UserRole.SUPPORT]), ticketController.getTicketById);
router.post('/', auth.authenticate([UserRole.ADMIN, UserRole.SUPPORT, UserRole.CUSTOMER]), ticketController.addTicket);
router.put('/', auth.authenticate([UserRole.ADMIN, UserRole.SUPPORT]), ticketController.updateTicket);
router.delete('/:id', auth.authenticate([UserRole.ADMIN]), ticketController.deleteTicketById);

export = router;
