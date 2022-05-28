import {execute} from "../utils/database-connector";
import {Employee} from "../classes/employee";
import {employeeQueries} from "../queries/employee-queries";

export const getAllEmployees = async () => {
    return execute<Employee[]>(employeeQueries.getAllEmployees, [], "rows");
};

export const getEmployeeById = async (id: Employee['employee_id']) => {
    const employees = await execute<Employee[]>(employeeQueries.getEmployeeById, [id], "rows");

    return employees[0];
};

export const insertEmployee = async (employee: Employee) => {
    const rowCount = await execute<number>(employeeQueries.addEmployee, [
        employee.department,
        employee.permissions,
        employee.hire_date,
        employee.gender,
        employee.salary,
        employee.user_id
    ], "rowCount");

    return rowCount > 0;
};

export const updateEmployee = async (employee: Employee) => {
    const rowCount = await execute<number>(employeeQueries.updateEmployees, [
        employee.department,
        employee.permissions,
        employee.hire_date,
        employee.gender,
        employee.salary,

        employee.employee_id
    ], "rowCount");

    return  rowCount;
};

export const deleteEmployeeById = async (id: Employee['employee_id']) => {
    const rowCount = await execute<number>(employeeQueries.deleteEmployeeById, [id], "rowCount");

    return rowCount > 0;
};
