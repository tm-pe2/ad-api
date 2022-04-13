import request from "supertest";
import router from "../server";

describe('Address Endpoints', () => {
    it('should create a new address', async () => {
        const response = await request(router)
            .post('/api/addresses')
            .send({
                city: 'testCity',
                street: 'testStreet',
                houseNumber: '9999',
                postalCode: '7777',
                country: 'testCountry',
                startDate: '2012-01-01',
                endDate: '2022-01-01'
            })
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single address', async () => {
        const response = await request(router)
            .get(`/api/addresses/5`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.address[0]).toHaveProperty('AdressID', 5);
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
                addressId: 5,
                city: 'testCityUpdate',
                street: 'testStreettestCityUpdate',
                houseNumber: '99990',
                postalCode: 9999,
                country: 'testCountryUpdate',
                startDate: '2019-01-01',
                endDate: '2029-01-01'
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete an address', async () => {
        const response = await request(router)
            .delete(`/api/addresses/4`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
