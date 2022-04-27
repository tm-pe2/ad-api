import request from "supertest";
import router from "../server";

describe('Contract Endpoints', () => {
    it('should create a new contract', async () => {
        const response = await request(router)
            .post('/api/contracts')
            .send({
                StartDate: '2022-04-12',
                EndDate: '2023-04-12',
                CustomerID: '1',
                CustomerType: 'mastercard',
                AdvancedPayement: '1000',
                Price: '999.99',
                TarifID: 1,
                EstimatedID: 1
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
                ContractID: 5,
                StartDate: '2022-04-12',
                EndDate: '2023-04-12',
                CustomerID: '5',
                CustomerType: 'mastercard',
                AdvancedPayement: '1000',
                Price: '999.99',
                TarifID: 2,
                EstimatedID: 1
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
