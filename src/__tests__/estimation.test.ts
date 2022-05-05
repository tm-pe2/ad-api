import request from "supertest";
import router from "../server";

describe('Estimation Endpoints', () => {
    it('should create a new estimation', async () => {
        const response = await request(router)
            .post('/api/estimations')
            .send({
                service_type: 1,
                address_id: 1,
                building_type: 1,
                family_size: 3,
                past_consumption: 999,
                electric_car: 1,
                wellness: 0,
                heating_type: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single estimation', async () => {
        const response = await request(router)
            .get(`/api/estimations/2`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.estimation).toHaveProperty('estimation_id', 2);
    });

    it('should fetch all estimations', async () => {
        const response = await request(router)
            .get('/api/estimations')
        expect(response.statusCode).toEqual(200);
        expect(response.body.estimations.length).toBeGreaterThan(1);
    });

    it('should update an estimation', async () => {
        const response = await request(router)
            .put(`/api/estimations/`)
            .send({
                estimation_id: 2,
                service_type: 2,
                address_id: 1,
                building_type: 2,
                family_size: 9,
                past_consumption: 1000,
                electric_car: 2,
                wellness: 1,
                heating_type: 2
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete an estimation', async () => {
        const response = await request(router)
            .delete(`/api/estimations/3`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
