import request from "supertest";
import router from "../server";

describe('Invoice Endpoints', () => {
    it('should create a new invoice', async () => {
        const response = await request(router)
            .post('/api/invoices')
            .send({
                customer_id: 1,
                supplier_id: 1,
                Date: '2022-04-01',
                due_date: '2022-05-01',
                status_id: 1,
                gas_amount: 100.01,
                electricity_type: 1,
                price: 991,
                tax: 21,
                start_date: '2022-01-01',
                end_date: '2023-01-01'
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single invoice', async () => {
        const response = await request(router)
            .get(`/api/invoices/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.invoice[0]).toHaveProperty('invoice_id', 1);
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
                invoice_id: 1,
                customer_id: 1,
                supplier_id: 1,
                Date: '2022-04-01',
                due_date: '2027-05-01',
                status_id: 1,
                gas_amount: 189.99,
                electricity_type: 1,
                price: 1000.08,
                tax: 17,
                start_date: '2022-01-01',
                end_date: '2024-01-01'
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
