import request from "supertest";
import router from "../server";

describe('Customer Endpoints', () => {

    it('should create a new customer', async () => {
        const response = await request(router)
            .post('/api/customers')
            .send({
                firstName: 'TestFirst',
                lastName: 'TestLast',
                birthDate: '2022-01-01',
                addressId: 1,
                email: 'test@test.com',
                phoneNumber: '0123 456789',
                password: 'Testpw123',
                gasType: 1,
                electricityType: 2
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should not create a new customer with invalid parameters', async () => {
        const response = await request(router)
            .post('/api/customers')
            .send({
                firstName: 'TestFirst',
                lastName: 'TestLast',
                birthDate: '2022-01-01',
                addressId: 1,
                email: 'testEmail.com',
                phoneNumber: '0123 456789',
                password: 'testpw123',
                gasType: 0,
                electricityType: 0
            });
        expect(response.statusCode).toEqual(500);
    });

    it('should fetch a single customer', async () => {
        const customerId = 1;
        const response = await request(router)
            .get(`/api/customers/${customerId}`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.customer[0]).toHaveProperty('CustomerID', customerId);
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
                customerId: 1,
                firstName: 'updatedFirst1',
                lastName: 'updatedLast1',
                birthDate: '2022-01-02',
                addressId: 1,
                email: 'updated1@updated.com',
                phoneNumber: '987654 3211',
                password: 'Updatedpw1231',
                gasType: 3,
                electricityType: 3
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
