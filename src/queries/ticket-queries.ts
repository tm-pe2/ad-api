export const ticketQueries = {
    getAllTickets: `
        SELECT * FROM tickets
    `,

    getTicketById: `
        SELECT * FROM tickets WHERE tickets.ticketid = $1
    `,

    addTicket: `
        INSERT INTO tickets SET $1
    `,

    updateTicket: `
        UPDATE tickets 
        SET
            IssueID = $1,
            AssignedTech = $2,
            Title = $3,
            Description = $4,
            Date = $5,
            Status = $6,
            Employee = $7
        WHERE ticketid = $8
    `,

    deleteTicketById: `
        DELETE FROM tickets WHERE ticketid = $1
    `
};
