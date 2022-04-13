import request from "supertest";
import router from "../server";

describe('Employee Endpoints', () => {
    it('should create a new employee', async () => {
        const response = await request(router)
            .post('/api/employees')
            .send({
                firstName: 'testFirstName',
                lastName: 'testLastName',
                birthDate: '1-1-2000',
                addressId: 1,
                email: 'testEmail@test.com',
                phoneNumber: '0123 456789',
                password: 'TestPw123',
                department: "Human Resources",
                permissions: 1,
                hireDate: '2000-04-01',
                gender: 1
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body.result).toEqual(true);
    });

    it('should fetch a single employee', async () => {
        const response = await request(router)
            .get(`/api/employees/1`)
        expect(response.statusCode).toEqual(200);
        expect(Object.keys(response.body).length).toEqual(1);
        expect(response.body.employee[0]).toHaveProperty('EmployeeID', 1);
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
                employeeId: 5,
                firstName: 'updatedTestFirst',
                lastName: 'UpdatedTestLast',
                birthDate: '1-1-2010',
                addressId: 1,
                email: 'updatedTestEmail@test.com',
                phoneNumber: '0123 456000',
                password: 'TestPw12345',
                department: "updatedDepartment",
                permissions: "2",
                hireDate: '2022-04-01',
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
