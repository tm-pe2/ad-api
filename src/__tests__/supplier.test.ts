import request from "supertest";
import router from "../server";

describe('Supplier Endpoints', () => {
    it('should create a new supplier', async () => {
        const response = await request(router)
            .post('/api/suppliers')
            .send({
                name: 'name1',
                supply_type: 'type1',
                company_name: 'companyName1',
                address_id:  1,
                vat_number: "BE0123456789"
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single supplier', async () => {
        const response = await request(router)
            .get(`/api/suppliers/2`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.supplier).toHaveProperty('supplier_id', 2);
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
                supplier_id: 2,
                name: 'name1',
                supply_type: 'type1',
                company_name: 'companyName1',
                address_id:  1,
                vat_number: "BE0123456789"
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete a supplier', async () => {
        const response = await request(router)
            .delete(`/api/suppliers/3`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
