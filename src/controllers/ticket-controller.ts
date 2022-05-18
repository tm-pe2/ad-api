import {Request, RequestHandler, Response} from 'express';
import {Ticket, ticketSchema} from '../classes/ticket';
import * as ticketService from '../services/ticket-service';

export const getAllTickets: RequestHandler = async (req: Request, res: Response) => {
    try {
        const tickets = await ticketService.getAllTickets();

        res.status(200).json({
            tickets
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching tickets!'
        });
    }
};

export const getTicketById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const ticket = await ticketService.getTicketById(Number(req.params.id));

        res.status(200).json({
            ticket
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching ticket'
        });
    }
};

export const addTicket: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const addTicketSchema = ticketSchema.fork('ticket_id', field => field.optional());
        let ticket: Ticket = await addTicketSchema.validateAsync(req.body);

        if(await ticketService.insertTicket(ticket))
            res.status(200).json({
                message: "Ticket inserted successfully!"
            });
        else
            res.status(200).json({
                message: "An error occurred while inserting ticket!"
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new ticket'
        });
    }
};

export const updateTicket: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        let ticket: Ticket = await ticketSchema.validateAsync(req.body);

        if(await ticketService.updateTicket(ticket))
            res.status(200).json({
                message: "Ticket updated successfully!"
            });
        else
            res.status(200).json({
                message: "An error occurred while updating ticket!"
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating ticket'
        });
    }
};

export const deleteTicketById: RequestHandler = async (req: Request, res: Response) => {
    try {
        if(await ticketService.deleteTicketById(Number(req.params.id)))
            res.status(200).json({
                message: "Ticket deleted successfully!"
            });
        else
            res.status(200).json({
                message: "An error occurred while deleting ticket!"
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting ticket'
        });
    }
};
