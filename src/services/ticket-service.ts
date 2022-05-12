import {execute} from "../utils/mysql.connector";
import {Ticket} from "../classes/ticket";
import {ticketQueries} from "../queries/ticket-queries";

export const getAllTickets = async () => {
    return await execute<{rows: Ticket[]}>(ticketQueries.getAllTickets, [], "rows");
};

export const getTicketById = async (id: Ticket['ticket_id']) => {
    const tickets = await execute<Ticket[]>(ticketQueries.getTicketById, [id], "rows");

    return tickets[0];
};

export const insertTicket = async (ticket: Ticket) => {
    const rowCount = await execute<number>(ticketQueries.addTicket, [
        ticket.issue_id,
        ticket.assigned_tech,
        ticket.title,
        ticket.description,
        ticket.date,
        ticket.status_id,
        ticket.is_employee
    ], "rowCount");

    return rowCount > 0;
};

export const updateTicket = async (ticket: Ticket) => {
    const rowCount = await execute<number>(ticketQueries.updateTicket, [
        ticket.issue_id,
        ticket.assigned_tech,
        ticket.title,
        ticket.description,
        ticket.date,
        ticket.status_id,
        ticket.is_employee,

        ticket.ticket_id
    ], "rowCount");

    return rowCount > 0;
};

export const deleteTicketById = async (id: Ticket['ticket_id']) => {
    const rowCount = await execute<number>(ticketQueries.deleteTicketById, [id], "rowCount");

    return rowCount > 0;
};
