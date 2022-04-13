import request from "supertest";
import router from "../server";

describe('Invoice Endpoints', () => {
    it('should create a new invoice', async () => {
        const response = await request(router)
            .post('/api/invoices')
            .send({
                customerId: 1,
                supplierId: 1,
                date: '2022-04-01',
                dueDate: '2022-05-01',
                status: 1,
                gasAmount: 100.01,
                electricityType: 1,
                price: 991,
                tax: 21,
                startDate: '2022-01-01',
                endDate: '2023-01-01'
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single invoice', async () => {
        const response = await request(router)
            .get(`/api/invoices/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.invoice[0]).toHaveProperty('InvoiceID', 1);
    });

    it('should fetch all invoices', async () => {
        const response = await request(router)
            .get('/api/invoices')
        expect(response.statusCode).toEqual(200);
        expect(response.body.invoices.length).toBeGreaterThan(1);
    });

    it('should update an invoice', async () => {
        const response = await request(router)
            .put(`/api/invoices/`)
            .send({
                invoiceId: 1,
                customerId: 1,
                supplierId: 1,
                date: '2022-04-01',
                dueDate: '2027-05-01',
                status: 1,
                gasAmount: 189.99,
                electricityType: 1,
                price: 1000.08,
                tax: 17,
                startDate: '2022-01-01',
                endDate: '2024-01-01'
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete an invoice', async () => {
        const response = await request(router)
            .delete(`/api/invoices/4`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
