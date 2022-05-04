import request from "supertest";
import router from "../server";

describe('Ticket Endpoints', () => {
    it('should create a new ticket', async () => {
        const response = await request(router)
            .post('/api/tickets')
            .send({
                IssueID: 1,
                AssignedTech: 1,
                Title: 'test',
                Description: 'descr test',
                Date: '2012-01-01',
                Status: 0,
                Employee: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single ticket', async () => {
        const response = await request(router)
            .get(`/api/tickets/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.ticket[0]).toHaveProperty('TicketID', 1);
    });

    it('should fetch all tickets', async () => {
        const response = await request(router)
            .get('/api/tickets')
        expect(response.statusCode).toEqual(200);
        expect(response.body.tickets.length).toBeGreaterThan(1);
    });

    it('should update a ticket', async () => {
        const response = await request(router)
            .put(`/api/tickets/`)
            .send({
                TicketID: 5,
                IssueID: 3,
                AssignedTech: 3,
                Title: 'updated title test',
                Description: 'updates descr test',
                Date: '2012-01-01',
                Status: 1,
                Employee: 2
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete a ticket', async () => {
        const response = await request(router)
            .delete(`/api/tickets/4`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
