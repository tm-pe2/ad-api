import request from "supertest";
import router from "../server";

describe('Tariff Endpoints', () => {
    it('should create a new tariff', async () => {
        const response = await request(router)
            .post('/api/tariffs')
            .send({
                SmallInd: 1,
                MediumInd: 1,
                BigInd: 1,
                SmallComp: 1,
                MediumComp: 1,
                BigComp: 1
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
                TarifID: 5,
                SmallInd: 9,
                MediumInd: 9,
                BigInd: 9,
                SmallComp: 9,
                MediumComp: 9,
                BigComp: 9
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
