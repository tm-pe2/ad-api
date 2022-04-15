import {execute} from "../utils/mysql.connector";
import {Ticket} from "../classes/ticket";
import {ticketQueries} from "../queries/ticket-queries";

export const getAllTickets = async () => {
    return execute<Ticket[]>(ticketQueries.getAllTickets, []);
};

export const getTicketById = async (id: Ticket['TicketID']) => {
    return execute<Ticket>(ticketQueries.getTicketById, [id]);
};

export const insertTicket = async (ticket: Ticket) => {
    const result = await execute<{ affectedRows: number }>(ticketQueries.addTicket, [
        ticket
    ]);
    return result.affectedRows > 0;
};

export const updateTicket = async (ticket: Ticket) => {
    const result = await execute<{ affectedRows: number }>(ticketQueries.updateTicket, [
        ticket.IssueID,
        ticket.AssignedTech,
        ticket.Title,
        ticket.Description,
        ticket.Date,
        ticket.Status,
        ticket.Employee,
        ticket.TicketID
    ]);
    return result.affectedRows > 0;
};

export const deleteTicketById = async (id: Ticket['TicketID']) => {
    const result = await execute<{ affectedRows: number }>(ticketQueries.deleteTicketById, [id]);
    return result.affectedRows > 0;
};
