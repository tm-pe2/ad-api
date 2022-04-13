import request from "supertest";
import router from "../server";

describe('Supplier Endpoints', () => {
    it('should create a new supplier', async () => {
        const response = await request(router)
            .post('/api/suppliers')
            .send({
                name: 'name1',
                supplyType: 'type1',
                companyName: 'companyName1',
                addressId:  1
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
                supplierId: 5,
                name: 'name1',
                supplyType: 'type1',
                companyName: 'companyName1',
                addressId:  1
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
