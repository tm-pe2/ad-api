import {execute} from "../utils/mysql.connector";
import {Ticket} from "../classes/ticket";
import {ticketQueries} from "../queries/ticket-queries";

export const getAllTickets = async () => {
    let tickets = execute<{rows: Ticket[]}>(ticketQueries.getAllTickets, []);
    console.log(tickets);
    return (await tickets).rows;
};

export const getTicketById = async (id: Ticket['TicketID']) => {
    let ticket = execute<{rows: Ticket}>(ticketQueries.getTicketById, [id]);
    console.log(ticket);
    return (await ticket).rows;
};

export const insertTicket = async (ticket: Ticket) => {
    const result = await execute<{ rowCount: number }>(ticketQueries.addTicket, [
        ticket
    ]);
    return result.rowCount > 0;
};

export const updateTicket = async (ticket: Ticket) => {
    const result = await execute<{ rowCount: number }>(ticketQueries.updateTicket, [
        ticket.IssueID,
        ticket.AssignedTech,
        ticket.Title,
        ticket.Description,
        ticket.Date,
        ticket.Status,
        ticket.Employee,
        ticket.TicketID
    ]);
    return result.rowCount > 0;
};

export const deleteTicketById = async (id: Ticket['TicketID']) => {
    const result = await execute<{ rowCount: number }>(ticketQueries.deleteTicketById, [id]);
    return result.rowCount > 0;
};
