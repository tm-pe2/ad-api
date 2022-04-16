import {execute} from "../utils/mysql.connector";
import {Employee} from "../classes/employee";
import {employeeQueries} from "../queries/employee-queries";

export const getAllEmployees = async () => {
    return execute<Employee[]>(employeeQueries.getAllEmployees, []);
};

export const getEmployeeById = async (id: Employee['EmployeeID']) => {
    return execute<Employee>(employeeQueries.getEmployeeById, [id]);
};

export const getEmployeeByEmail = async (email: Employee['Email']) => {
    return execute<Employee>(employeeQueries.getEmployeeByEmail, [email]);
};

export const insertEmployee = async (employee: Employee) => {
    const result = await execute<{ affectedRows: number }>(employeeQueries.addEmployee, [
        employee
    ]);
    return result.affectedRows > 0;
};

export const updateEmployee = async (employee: Employee) => {
    const result = await execute<{ affectedRows: number }>(employeeQueries.updateEmployees, [
        employee.FirstName,
        employee.LastName,
        employee.BirthDate,
        employee.AdressID,
        employee.Email,
        employee.PhoneNumber,
        employee.Password,
        employee.Departement,
        employee.Permissions,
        employee.HireDate,
        employee.Gender,
        employee.EmployeeID
    ]);
    return result.affectedRows > 0;
};

export const deleteEmployeeById = async (id: Employee['EmployeeID']) => {
    const result = await execute<{ affectedRows: number }>(employeeQueries.deleteEmployeeById, [id]);
    return result.affectedRows > 0;
};
