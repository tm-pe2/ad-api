import request from "supertest";
import router from "../server";

describe('Customer Endpoints', () => {

    it('should create a new customer', async () => {
        const response = await request(router)
            .post('/api/customers')
            .send({
                first_name: 'TestFirst',
                last_name: 'TestLast',
                birth_date: '2022-01-01',
                address_id: 1,
                email: 'test@test.com',
                phone_number: '0123 456789',
                password: 'Testpw123',
                gas_type: 1,
                electricity_type: 2
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single customer', async () => {
        const response = await request(router)
            .get(`/api/customers/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.customer[0]).toHaveProperty('customer_id', 1);
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
                customer_id: 1,
                first_name: 'UpdTestFirst',
                last_name: 'UpdTestLast',
                birth_date: '2025-01-01',
                address_id: 1,
                email: 'updtest@test.com',
                phone_number: '0123 456999',
                password: 'Testpw12663',
                gas_type: 2,
                electricity_type: 3
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
