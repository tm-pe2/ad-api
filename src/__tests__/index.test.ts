import router from "../server"

import request from "supertest"


/* https://stackoverflow.com/a/28199817 */
let route,routes:any = []
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

// test for  GET /clients/:id

describe(`GET /clients/:id`, () => {
    it(`should return a 200 response`, async () => {
        const response = await request(router).get('/clients/1')
        expect(response.status).toBe(200)
    })
});

//test for PUT /clients/:id

describe(`PUT /clients/:id`, () => {
    it(`should return a 200 response`, async () => {
        const response = await request(router).put('/clients/1')
        expect(response.status).toBe(200)
    })
});

//test for DELETE /clients/:id

describe(`DELETE /clients/:id`, () => {
    it(`should return a 200 response`, async () => {
        const response = await request(router).delete('/clients/1')
        expect(response.status).toBe(200)
    })
});

//test for GET /posts/:id

describe(`GET /posts/:id`, () => {
    it(`should return a 200 response`, async () => {
        const response = await request(router).get('/posts/1')
        expect(response.status).toBe(200)
    })
});

//test for PUT /posts/:id

describe(`PUT /posts/:id`, () => {
    it(`should return a 200 response`, async () => {
        const response = await request(router).put('/posts/1')
        expect(response.status).toBe(200)
    })
});

//test for DELETE /posts/:id

describe(`DELETE /posts/:id`, () => {
    it(`should return a 200 response`, async () => {
        const response = await request(router).delete('/posts/1')
        expect(response.status).toBe(200)
    })
});


//TICKETING

//tickets
describe('GET /tickets', () => {
    it('should return a 200 response', async () => {
        const response = await request(router).get('/tickets')
        expect(response.status).toBe(200)
    })
})
//users
describe('GET /tickets/user/:id', () => {
    it('should return a 200 response', async () => {
        const response = await request(router).get('/tickets/user/1')
        expect(response.status).toBe(200)
    })
}
    )


// Dashboard users (dummy test)
describe('GET /dashboard/users/0', () => {
    it('should return a 200 response', async () => {
        const response = await request(router).get('/tickets')
        expect(response.status).toBe(200)
    })
})
