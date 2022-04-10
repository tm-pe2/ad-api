/** source/controllers/clients.ts */
import {execute} from "../utils/mysql.connector";
import {Employee} from "../classes/employee";
import {EmployeeQueries} from "../queries/employeeQueries";

export const getAllEmployees = async () => {
    return execute<Employee[]>(EmployeeQueries.getAllEmployees, []);
};

export const getEmployeeById = async (id: Employee['employeeId']) => {
    return execute<Employee>(EmployeeQueries.getEmployeeById, [id]);
};

export const insertEmployee = async (employee: Employee) => {
    const result = await execute<{ affectedRows: number }>(EmployeeQueries.addEmployee, [employee]);
    return result.affectedRows > 0;
};

export const updateEmployee = async (employee: Employee) => {
    const result = await execute<{ affectedRows: number }>(EmployeeQueries.updateEmployees, [
        employee.firstName,
        employee.lastName,
        employee.dateOfBirth,
        employee.addressId,
        employee.email,
        employee.phoneNumber,
        employee.password,
        employee.department,
        employee.hireDate,
        employee.gender,
        employee.permissions,
        employee.employeeId
    ]);
    return result.affectedRows > 0;
};

export const deleteEmployeeById = async (id: Employee['employeeId']) => {
    const result = await execute<{ affectedRows: number }>(EmployeeQueries.deleteEmployeeById, [id]);
    return result.affectedRows > 0;
};
