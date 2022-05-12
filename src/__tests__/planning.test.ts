import request from "supertest";
import router from "../server";

describe('Planning Endpoints', () => {
    it('should create a new planning', async () => {
        const response = await request(router)
            .post('/api/plannings')
            .send({
                employee_id: 1,
                customer_id: 1,
                date: '2022-04-13',
                status: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single planning', async () => {
        const response = await request(router)
            .get(`/api/plannings/2`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.planning).toHaveProperty('planning_id', 2);
    });

    it('should fetch all plannings', async () => {
        const response = await request(router)
            .get('/api/plannings')
        expect(response.statusCode).toEqual(200);
        expect(response.body.plannings.length).toBeGreaterThan(1);
    });

    it('should update a planning', async () => {
        const response = await request(router)
            .put(`/api/plannings/`)
            .send({
                planning_id: 2,
                employee_id: 1,
                customer_id: 1,
                date: '2024-05-14',
                status: 0
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });


});
