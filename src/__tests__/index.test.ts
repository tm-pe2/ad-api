import router from "../server";
import request from "supertest";

/* https://stackoverflow.com/a/28199817 */
/**let route,routes:any = []
 router._router.stack.forEach(function(middleware: any) {
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware
        middleware.handle.stack.forEach(function(handler:any){
            route = handler.route;
            route && routes.push(route);
        });
    }
});
 let rootpath: RegExp = /\/\w*$/gm;


 /**
 //post routes
 routes.filter((r:any) => r.methods.post && rootpath.test(r.path) ).forEach((route: any) => {
    describe(`POST ${route.path}`, () => {
        it(`should return a 200 response`, async () => {
            const response = await request(router).post(route.path)
            expect(response.status).toBe(200)
        })
    })
})

 //get routes
 routes.filter((r:any) => r.methods.get && rootpath.test(r.path)).forEach((route: any) => {
    describe(`GET ${route.path}`, () => {
        it(`should return a 200 response`, async () => {
            const response = await request(router).get(route.path)
            expect(response.status).toBe(200)
        })
    })
})

 //put routes
 routes.filter((r:any) => r.methods.put && rootpath.test(r.path)).forEach((route: any) => {
    describe(`PUT ${route.path}`, () => {
        it(`should return a 200 response`, async () => {
            const response = await request(router).put(route.path)
            expect(response.status).toBe(200)
        })
    })
});
 //delete routes
 routes.filter((r:any) => r.methods.delete && rootpath.test(r.path)).forEach((route: any) => {
    describe(`DELETE ${route.path}`, () => {
        it(`should return a 200 response`, async () => {
            const response = await request(router).delete(route.path)
            expect(response.status).toBe(200)
        })
    })
});
 */

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
                Password: 'Testpw123'
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single customer', async () => {
        const customerId = 1;
        const response = await request(router)
            .get(`/api/customers/${customerId}`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.customer[0]).toHaveProperty('ClientID', customerId);
    });

    it('should fetch all customers', async () => {
        const response = await request(router)
            .get('/api/customers')
        expect(response.statusCode).toEqual(200);
        expect(response.body.customers.length).toBeGreaterThan(1);
    });

    it('should update a customer', async () => {
        const customerId = 1;
        const response = await request(router)
            .put(`/api/customers/`)
            .send({
                ClientID: customerId,
                FirstName: 'updatedFirst1',
                LastName: 'updatedLast1',
                BirthDate: '2022-01-02',
                AdressID: 8,
                Email: 'updated1@updated.com',
                PhoneNumber: '987654 3211',
                Password: 'Updatedpw1231'
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete a customer', async () => {
        const customerId = 4;
        const response = await request(router)
            .delete(`/api/customers/${customerId}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});

describe('Address Endpoints', () => {
    it('should create a new address', async () => {
        const response = await request(router)
            .post('/api/addresses')
            .send({
                City: 'testCity',
                Street: 'testStreet',
                HouseNumber: '9999',
                PostalCode: 7777,
                Country: 'testCountry',
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single address', async () => {
        const addressId = 5;
        const response = await request(router)
            .get(`/api/addresses/${addressId}`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.address[0]).toHaveProperty('AdressID', addressId);
    });

    it('should fetch all customers', async () => {
        const response = await request(router)
            .get('/api/addresses')
        expect(response.statusCode).toEqual(200);
        expect(response.body.addresses.length).toBeGreaterThan(1);
    });

    it('should update an address', async () => {
        const addressId = 5;
        const response = await request(router)
            .put(`/api/addresses/`)
            .send({
                AdressID: addressId,
                City: 'testCityUpdate',
                Street: 'testStreettestCityUpdate',
                HouseNumber: '99990',
                PostalCode: 77770,
                Country: 'testCountryUpdate',
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete an address', async () => {
        const addressId = 4;
        const response = await request(router)
            .delete(`/api/addresses/${addressId}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
