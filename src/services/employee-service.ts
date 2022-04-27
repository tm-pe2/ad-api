import {execute} from "../utils/mysql.connector";
import {Employee} from "../classes/employee";
import {employeeQueries} from "../queries/employee-queries";

export const getAllEmployees = async () => {
    return execute<Employee[]>(employeeQueries.getAllEmployees, []);
};

export const getEmployeeById = async (id: Employee['EmployeeID']) => {
    return execute<Employee>(employeeQueries.getEmployeeById, [id]);
};

export const insertEmployee = async (employee: Employee) => {
    const result = await execute<{ rowCount: number }>(employeeQueries.addEmployee, [
        employee
    ]);
    return result.rowCount > 0;
};

export const updateEmployee = async (employee: Employee) => {
    const result = await execute<{ rowCount: number }>(employeeQueries.updateEmployees, [
        employee.Departement,
        employee.Permissions,
        employee.HireDate,
        employee.Gender,
        employee.EmployeeID
    ]);
    return result.rowCount > 0;
};

export const deleteEmployeeById = async (id: Employee['EmployeeID']) => {
    const result = await execute<{ rowCount: number }>(employeeQueries.deleteEmployeeById, [id]);
    return result.rowCount > 0;
};
