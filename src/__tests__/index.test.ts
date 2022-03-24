import router from "../server";
import request from "supertest";


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

describe(`GET /client/:id`, () => {
    it(`should return a 200 response`, async () => {
        const response = await request(router).get('/client/1')
        expect(response.status).toBe(200)
    })
});

//test for PUT /clients/:id

describe(`PUT /updateClient/:id`, () => {
    it(`should return a 200 response`, async () => {
        const response = await request(router).put('/updateClient/1')
        expect(response.status).toBe(200)
    })
});

//test for DELETE /clients/:id

describe(`DELETE /deleteClient/:id`, () => {
    it(`should return a 200 response`, async () => {
        const response = await request(router).delete('/deleteClient/1')
        expect(response.status).toBe(200)
    })
});
