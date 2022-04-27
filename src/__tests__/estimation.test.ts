import request from "supertest";
import router from "../server";

describe('Estimation Endpoints', () => {
    it('should create a new estimation', async () => {
        const response = await request(router)
            .post('/api/estimations')
            .send({
                ServiceType: 1,
                AdressID: 1,
                BuildingType: 1,
                FamilySize: 3,
                PastConsumption: 999,
                ElectricCar: 1,
                Welness: 0,
                HeatingType: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single estimation', async () => {
        const response = await request(router)
            .get(`/api/estimations/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.estimation[0]).toHaveProperty('EstimatedID', 1);
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
                EstimatedID: 5,
                ServiceType: 2,
                AdressID: 1,
                BuildingType: 2,
                FamilySize: 9,
                PastConsumption: 1000,
                ElectricCar: 2,
                Welness: 1,
                HeatingType: 2
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete an estimation', async () => {
        const response = await request(router)
            .delete(`/api/estimations/4`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
