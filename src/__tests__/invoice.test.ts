import request from "supertest";
import router from "../server";

describe('Invoice Endpoints', () => {
    it('should create a new invoice', async () => {
        const response = await request(router)
            .post('/api/invoices')
            .send({
                CustomerID: 1,
                SupplierID: 1,
                Date: '2022-04-01',
                DueDate: '2022-05-01',
                Status: 1,
                GasAmount: 100.01,
                ElectricityType: 1,
                Price: 991,
                Tax: 21,
                StartDate: '2022-01-01',
                EndDate: '2023-01-01'
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
                InvoiceID: 1,
                CustomerID: 1,
                SupplierID: 1,
                Date: '2022-04-01',
                DueDate: '2027-05-01',
                Status: 1,
                GasAmount: 189.99,
                ElectricityType: 1,
                Price: 1000.08,
                Tax: 17,
                StartDate: '2022-01-01',
                EndDate: '2024-01-01'
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