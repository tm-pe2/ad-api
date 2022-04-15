export const ticketQueries = {
    getAllTickets: `
        SELECT * FROM tickets
    `,

    getTicketById: `
        SELECT * FROM tickets WHERE TicketID = ?
    `,

    addTicket: `
        INSERT INTO tickets SET ?
    `,

    updateTicket: `
        UPDATE tickets 
        SET
            IssueID = ?,
            AssignedTech = ?,
            Title = ?,
            Description = ?,
            Date = ?,
            Status = ?,
            Employee = ?
        WHERE TicketID = ?
    `,

    deleteTicketById: `
        DELETE FROM tickets WHERE TicketID = ?
    `
};
