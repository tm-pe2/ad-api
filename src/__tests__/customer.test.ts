import request from "supertest";
import router from "../server";

describe('Customer Endpoints', () => {
    it('should create a new customer', async () => {
        const response = await request(router)
            .post('/api/customers')
            .send({
                role_id: 1,
                first_name: 'TestFirst',
                last_name: 'TestLast',
                birth_date: '2022-01-01',
                address_id: 1,
                email: 'test@test.com',
                phone_number: '0123 456789',
                password: 'Testpw123',
                national_registry_number: '987654321',
                gas_type: 1,
                electricity_type: 1,
                gas_meter_id: 0,
                electricity_meter_id: 1,
                city: "Affligem",
                street: "Brusselbaan",
                house_number: "197",
                postal_code: "1780",
                country: "Belgium",
                start_date: "2020-03-14",
                end_date: "2020-06-14"
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single customer', async () => {
        const response = await request(router)
            .get(`/api/customers/2`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.customer).toHaveProperty('customer_id', 2);
    });

    it('should fetch all contracts of a customer', async () => {
        const response = await request(router)
            .get(`/api/customers/:id/contracts`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.customer).toHaveProperty('customer_id', 2);
    });

    it('should fetch all customers that have a contract', async () => {
        const response = await request(router)
            .get('/api/customers/contracts')
        expect(response.statusCode).toEqual(200);
        expect(response.body.customers.length).toBeGreaterThan(1);
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
                role_id: 1,
                first_name: 'TestFirst',
                last_name: 'TestLast',
                birth_date: '2022-01-01',
                address_id: 1,
                email: 'test@test.com',
                phone_number: '0123 456789',
                password: 'Testpw123',
                national_registry_number: '987654321',
                gas_type: 1,
                electricity_type: 1,
                gas_meter_id: 0,
                electricity_meter_id: 1,
                city: "Affligem",
                street: "Brusselbaan",
                house_number: "197",
                postal_code: "1780",
                country: "Belgium",
                start_date: "2020-03-14",
                end_date: "2020-06-14"
            });
        expect(response?.statusCode).toEqual(200);
        expect(response?.body.result).toEqual(true);
    });

    it('should delete a customer', async () => {
        const response = await request(router)
            .delete(`/api/customers/3`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
