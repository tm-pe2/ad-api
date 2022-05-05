import request from "supertest";
import router from "../server";

describe('Planning Endpoints', () => {
    it('should create a new planning', async () => {
        const response = await request(router)
            .post('/api/plannings')
            .send({
                employee_id: 1,
                customer_id: 1,
                Date: '2022-04-13',
                status_id: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single planning', async () => {
        const response = await request(router)
            .get(`/api/plannings/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.planning[0]).toHaveProperty('planning_id', 1);
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
                planning_id: 5,
                employee_id: 1,
                customer_id: 1,
                Date: '2024-05-14',
                status_id: 0
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete a planning', async () => {
        const response = await request(router)
            .delete(`/api/plannings/4`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
