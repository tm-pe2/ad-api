import request from "supertest";
import router from "../server";

describe('Customer Endpoints', () => {

    it('should create a new customer', async () => {
        const response = await request(router)
            .post('/api/customers')
            .send({
                FirstName: 'TestFirst',
                LastName: 'TestLast',
                BirthDate: '2022-01-01',
                AdressID: 1,
                Email: 'test@test.com',
                PhoneNumber: '0123 456789',
                Password: 'Testpw123',
                GasType: 1,
                Electricitytype: 2
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single customer', async () => {
        const response = await request(router)
            .get(`/api/customers/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.customer[0]).toHaveProperty('CustomerID', 1);
    });

    it('should fetch all customers', async () => {
        const response = await request(router)
            .get('/api/customers')
        expect(response.statusCode).toEqual(200);
        expect(response.body.customers.length).toBeGreaterThan(1);
    });

    it('should update a customer', async () => {
        const response = await request(router)
            .put(`/api/customers/`)
            .send({
                CustomerID: 1,
                FirstName: 'UpdTestFirst',
                LastName: 'UpdTestLast',
                BirthDate: '2025-01-01',
                AdressID: 1,
                Email: 'updtest@test.com',
                PhoneNumber: '0123 456999',
                Password: 'Testpw12663',
                GasType: 2,
                Electricitytype: 3
            });
        expect(response?.statusCode).toEqual(200);
        expect(response?.body.result).toEqual(true);
    });

    it('should delete a customer', async () => {
        const response = await request(router)
            .delete(`/api/customers/4`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
