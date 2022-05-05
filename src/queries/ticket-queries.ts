export const ticketQueries = {
    getAllTickets: `
        SELECT * FROM tickets
    `,

    getTicketById: `
        SELECT * FROM tickets WHERE tickets.ticket_id = $1
    `,

    addTicket: `
        INSERT INTO tickets (issue_id, assigned_tech, title, description, date, status_id, is_employee)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
    `,

    updateTicket: `
        UPDATE tickets 
        SET
            issue_id = $1,
            assigned_tech = $2,
            title = $3,
            description = $4,
            date = $5,
            status = $6,
            employee = $7
        WHERE ticket_id = $8
    `,

    deleteTicketById: `
        DELETE FROM tickets WHERE ticket_id = $1
    `
};
