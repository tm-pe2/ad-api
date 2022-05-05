import request from "supertest";
import router from "../server";

describe('Employee Endpoints', () => {
    it('should create a new employee', async () => {
        const response = await request(router)
            .post('/api/employees')
            .send({
                role_id: 0,
                first_name: 'testFirstName',
                last_name: 'testLastName',
                birth_date: '1-1-2000',
                address_id: 1,
                email: 'testEmail@test.com',
                phone_number: '0123 456789',
                password: 'TestPw123',
                national_registry_number: '123456789',
                department: "Human Resources",
                permissions: 1,
                hire_date: '2000-04-01',
                gender: 1,
                salary: 3000
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should not create a new employee when user with email already exists', async () => {
        const response = await request(router)
            .post('/api/employees')
            .send({
                role_id: 0,
                first_name: 'testFirstName',
                last_name: 'testLastName',
                birth_date: '1-1-2000',
                address_id: 1,
                email: 'testEmail@test.com',
                phone_number: '0123 456789',
                password: 'TestPw123',
                national_registry_number: '123456789',
                department: "Human Resources",
                permissions: 1,
                hire_date: '2000-04-01',
                gender: 1,
                salary: 3000
            });
        expect(response.statusCode).toEqual(400);
    });

    it('should fetch a single employee', async () => {
        const response = await request(router)
            .get(`/api/employees/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.employee[0]).toHaveProperty('employee_id', 1);
    });

    it('should fetch all employees', async () => {
        const response = await request(router)
            .get('/api/employees')
        expect(response.statusCode).toEqual(200);
        expect(response.body.employees.length).toBeGreaterThan(1);
    });

    it('should update an employee', async () => {
        const response = await request(router)
            .put(`/api/employees/`)
            .send({
                employee_id: 5,
                first_name: 'updatedTestFirst',
                last_name: 'UpdatedTestLast',
                birth_date: '1-1-2010',
                address_id: 1,
                email: 'updatedTestEmail@test.com',
                phone_number: '0123 456000',
                password: 'TestPw12345',
                department: "updatedDepartment",
                permissions: "2",
                hire_date: '2022-04-01',
                gender: 0
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should delete an employee', async () => {
        const response = await request(router)
            .delete(`/api/employees/4`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });
});
