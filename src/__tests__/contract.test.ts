import request from "supertest";
import router from "../server";

describe('Contract Endpoints', () => {
    it('should create a new contract', async () => {
        const response = await request(router)
            .post('/api/contracts')
            .send({
                startDate: '2022-04-12',
                endDate: '2023-04-12',
                customerId: '1',
                customerType: 'mastercard',
                advancedPayment: '1000',
                price: '999.99',
                tariffId: 1,
                estimatedId: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);

    });

    it('should fetch a single contract', async () => {
        const response = await request(router)
            .get(`/api/contracts/1`);
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.contract[0]).toHaveProperty('ContractID', 1);
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
                contractId: 5,
                startDate: '2022-04-12',
                endDate: '2023-04-12',
                customerId: '5',
                customerType: 'mastercard',
                advancedPayment: '1000',
                price: '999.99',
                tariffId: 2,
                estimatedId: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete a contract', async () => {
        const response = await request(router)
            .delete(`/api/contracts/4`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
