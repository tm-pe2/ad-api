import request from "supertest";
import router from "../server";

describe('Tariff Endpoints', () => {
    it('should create a new tariff', async () => {
        const response = await request(router)
            .post('/api/tariffs')
            .send({
                customer_type: 'customer_type',
                value: 20
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single tariff', async () => {
        const response = await request(router)
            .get(`/api/tariffs/2`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.tariff).toHaveProperty('tariff_id', 2);
    });

    it('should fetch all tariffs', async () => {
        const response = await request(router)
            .get('/api/tariffs')
        expect(response.statusCode).toEqual(200);
        expect(response.body.tariffs.length).toBeGreaterThan(1);
    });

    it('should update a tariff', async () => {
        const response = await request(router)
            .put(`/api/tariffs/`)
            .send({
                tariff_id: 2,
                customer_type: 'updatedCustomerType',
                value: 99
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete a tariff', async () => {
        const response = await request(router)
            .delete(`/api/tariffs/3`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
