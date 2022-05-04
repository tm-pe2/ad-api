import request from "supertest";
import router from "../server";

describe('Supplier Endpoints', () => {
    it('should create a new supplier', async () => {
        const response = await request(router)
            .post('/api/suppliers')
            .send({
                Name: 'name1',
                SupplyType: 'type1',
                CompanyName: 'companyName1',
                AdressID:  1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single supplier', async () => {
        const response = await request(router)
            .get(`/api/suppliers/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.supplier[0]).toHaveProperty('SupplierID', 1);
    });

    it('should fetch all suppliers', async () => {
        const response = await request(router)
            .get('/api/suppliers')
        expect(response.statusCode).toEqual(200);
        expect(response.body.suppliers.length).toBeGreaterThan(1);
    });

    it('should update a supplier', async () => {
        const response = await request(router)
            .put(`/api/suppliers/`)
            .send({
                SupplierID: 5,
                Name: 'name1',
                SupplyType: 'type1',
                CompanyName: 'companyName1',
                AdressID:  1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete a supplier', async () => {
        const response = await request(router)
            .delete(`/api/suppliers/4`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
