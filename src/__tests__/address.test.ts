import request from "supertest";
import router from "../server";

describe('Address Endpoints', () => {
    it('should create a new address', async () => {
        const response = await request(router)
            .post('/api/addresses')
            .send({
                city: 'testCity',
                street: 'testStreet',
                house_number: '9999',
                postal_code: '7777',
                country: 'testCountry',
                start_date: '2012-01-01',
                end_date: '2022-01-01'
            })
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single address', async () => {
        const response = await request(router)
            .get(`/api/addresses/2`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.address).toHaveProperty('address_id', 2);
    });

    it('should fetch all addresses', async () => {
        const response = await request(router)
            .get('/api/addresses')
        expect(response.statusCode).toEqual(200);
        expect(response.body.addresses.length).toBeGreaterThan(1);
    });

    it('should update an address', async () => {
        const response = await request(router)
            .put(`/api/addresses/`)
            .send({
                address_id: 2,
                city: 'testCityUpdate',
                street: 'testStreettestCityUpdate',
                house_number: '99990',
                postal_code: '9999',
                country: 'testCountryUpdate',
                start_date: '2019-01-01',
                end_date: '2029-01-01'
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete an address', async () => {
        const response = await request(router)
            .delete(`/api/addresses/3`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
