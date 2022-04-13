/** source/controllers/clients.ts */
import {execute} from "../utils/mysql.connector";
import {Employee} from "../classes/employee";
import {employeeQueries} from "../queries/employee-queries";

export const getAllEmployees = async () => {
    return execute<Employee[]>(employeeQueries.getAllEmployees, []);
};

export const getEmployeeById = async (id: Employee['employeeId']) => {
    return execute<Employee>(employeeQueries.getEmployeeById, [id]);
};

export const insertEmployee = async (employee: Employee) => {
    const result = await execute<{ affectedRows: number }>(employeeQueries.addEmployee, [
        employee.toJSON()
    ]);
    return result.affectedRows > 0;
};

export const updateEmployee = async (employee: Employee) => {
    const result = await execute<{ affectedRows: number }>(employeeQueries.updateEmployees, [
        employee.firstName,
        employee.lastName,
        employee.birthDate,
        employee.addressId,
        employee.email,
        employee.phoneNumber,
        employee.password,
        employee.department,
        employee.permissions,
        employee.hireDate,
        employee.gender,
        employee.employeeId
    ]);
    return result.affectedRows > 0;
};

export const deleteEmployeeById = async (id: Employee['employeeId']) => {
    const result = await execute<{ affectedRows: number }>(employeeQueries.deleteEmployeeById, [id]);
    return result.affectedRows > 0;
};
