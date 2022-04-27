import request from "supertest";
import router from "../server";

describe('Employee Endpoints', () => {
    it('should create a new employee', async () => {
        const response = await request(router)
            .post('/api/employees')
            .send({
                FirstName: 'testFirstName',
                LastName: 'testLastName',
                BirthDate: '1-1-2000',
                AdressID: 1,
                Email: 'testEmail@test.com',
                PhoneNumber: '0123 456789',
                Password: 'TestPw123',
                Departement: "Human Resources",
                Permissions: 1,
                HireDate: '2000-04-01',
                Gender: 1
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
                EmployeeID: 5,
                FirstName: 'updatedTestFirst',
                LastName: 'UpdatedTestLast',
                BirthDate: '1-1-2010',
                AdressID: 1,
                Email: 'updatedTestEmail@test.com',
                PhoneNumber: '0123 456000',
                Password: 'TestPw12345',
                Departement: "updatedDepartment",
                Permissions: "2",
                HireDate: '2022-04-01',
                Gender: 0
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
