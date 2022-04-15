import request from "supertest";
import router from "../server";

describe('Address Endpoints', () => {
    it('should create a new address', async () => {
        const response = await request(router)
            .post('/api/addresses')
            .send({
                City: 'testCity',
                Street: 'testStreet',
                HouseNumber: '9999',
                PostalCode: '7777',
                Country: 'testCountry',
                StartDate: '2012-01-01',
                EndDate: '2022-01-01'
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
                AdressID: 5,
                City: 'testCityUpdate',
                Street: 'testStreettestCityUpdate',
                HouseNumber: '99990',
                PostalCode: 9999,
                Country: 'testCountryUpdate',
                StartDate: '2019-01-01',
                EndDate: '2029-01-01'
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
