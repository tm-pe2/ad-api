import {execute} from "../utils/mysql.connector";
import {Employee} from "../classes/employee";
import {employeeQueries} from "../queries/employee-queries";

export const getAllEmployees = async () => {
    return execute<Employee[]>(employeeQueries.getAllEmployees, []);
};

export const getEmployeeById = async (id: Employee['employee_id']) => {
    return execute<Employee>(employeeQueries.getEmployeeById, [id]);
};

export const insertEmployee = async (employee: Employee) => {
    const result = await execute<{ rowCount: number }>(employeeQueries.addEmployee, [
        employee.department,
        employee.permissions,
        employee.hire_date,
        employee.gender,
        employee.salary,
        employee.user_id
    ]);
    return result.rowCount > 0;
};

export const updateEmployee = async (employee: Employee) => {
    const result = await execute<{ rowCount: number }>(employeeQueries.updateEmployees, [
        employee.department,
        employee.permissions,
        employee.hire_date,
        employee.gender,
        employee.salary,
        employee.user_id,

        employee.employee_id
    ]);
    return result.rowCount > 0;
};

export const deleteEmployeeById = async (id: Employee['employee_id']) => {
    const result = await execute<{ rowCount: number }>(employeeQueries.deleteEmployeeById, [id]);
    return result.rowCount > 0;
};
