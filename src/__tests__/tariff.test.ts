import request from "supertest";
import router from "../server";

describe('Tariff Endpoints', () => {
    it('should create a new tariff', async () => {
        const response = await request(router)
            .post('/api/tariffs')
            .send({
                small_ind: 1,
                medium_ind: 1,
                big_ind: 1,
                small_comp: 1,
                medium_comp: 1,
                big_comp: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single tariff', async () => {
        const response = await request(router)
            .get(`/api/tariffs/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.tariff[0]).toHaveProperty('tariff_id', 1);
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
                tariff_id: 5,
                small_ind: 9,
                medium_ind: 9,
                big_ind: 9,
                small_comp: 9,
                medium_comp: 9,
                big_comp: 9
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete a tariff', async () => {
        const response = await request(router)
            .delete(`/api/tariffs/4`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
