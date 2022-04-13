import request from "supertest";
import router from "../server";

describe('Estimation Endpoints', () => {
    it('should create a new estimation', async () => {
        const response = await request(router)
            .post('/api/estimations')
            .send({
                serviceType: 1,
                addressId: 1,
                buildingType: 1,
                familySize: 3,
                pastConsumption: 999,
                electricCar: 1,
                wellness: 0,
                heatingType: 1
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
                estimationId: 5,
                serviceType: 2,
                addressId: 1,
                buildingType: 2,
                familySize: 9,
                pastConsumption: 1000,
                electricCar: 2,
                wellness: 1,
                heatingType: 2
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
