import request from "supertest";
import router from "../server";

describe('Tariff Endpoints', () => {
    it('should create a new tariff', async () => {
        const response = await request(router)
            .post('/api/tariffs')
            .send({
                smallInd: 1,
                mediumInd: 1,
                bigInd: 1,
                smallComp: 1,
                mediumComp: 1,
                bigComp: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single tariff', async () => {
        const response = await request(router)
            .get(`/api/tariffs/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.tariff[0]).toHaveProperty('TarifID', 1);
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
                tariffId: 5,
                smallInd: 3,
                mediumInd: 3,
                bigInd: 3,
                smallComp: 3,
                mediumComp: 3,
                bigComp: 3
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
