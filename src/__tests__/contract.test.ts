import request from "supertest";
import router from "../server";

describe('Contract Endpoints', () => {
    it('should create a new contract', async () => {
        const response = await request(router)
            .post('/api/contracts')
            .send({
                start_date: '2022-04-12',
                end_date: '2023-04-12',
                customer_id: '4',
                customer_type: 'newCustomerType',
                advance_payment: '1000',
                price: '90909.99',
                tariff_id: 1,
                estimation_id: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);

    });

    it('should fetch a single contract', async () => {
        const response = await request(router)
            .get(`/api/contracts/2`);
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.contract).toHaveProperty('contract_id', 2);
    });

    it('should fetch all contracts', async () => {
        const response = await request(router)
            .get('/api/contracts')
        expect(response.statusCode).toEqual(200);
        expect(response.body.contracts.length).toBeGreaterThan(1);
    });

    it('should update a contract', async () => {
        const response = await request(router)
            .put(`/api/contracts/`)
            .send({
                contract_id: 2,
                start_date: '2022-04-12',
                end_date: '2023-04-12',
                customer_id: 2,
                customer_type: 'mastercard',
                advance_payment: '1000',
                price: '999.99',
                tariff_id: 2,
                estimation_id: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete a contract', async () => {
        const response = await request(router)
            .delete(`/api/contracts/3`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
