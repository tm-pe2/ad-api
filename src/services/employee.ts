import { PoolClient } from "pg";
import { Employee } from "../models/user";
import { employeeQueries } from "../queries/employee";
import { userQueries } from "../queries/users";
import { execute } from "../utils/database-connector";


export async function insertEmployee(client: PoolClient, user_id: number, hire_date: Date, salary: number): Promise<Boolean> {
    const result = await execute(client, employeeQueries.insertEmployee, [user_id, hire_date, salary]);
    return result.rowCount > 0;
}

export async function getAllEmployees(client: PoolClient): Promise<Employee[]> {
    const result = await execute(client, employeeQueries.getAllEmployees);
    return result.rows;
}

export async function getEmployeeById(client: PoolClient, id: Employee['id']): Promise<Employee> {
    const result = await execute(client, employeeQueries.getEmployeeById, [id]);
    return result.rows[0];
}

export async function modifyEmployee(client: PoolClient, employee: Employee): Promise<Boolean> {
    try {

        await execute(client, employeeQueries.modifyEmployee,
            [
                employee.id,
                employee.salary
            ]);
        await execute(client, userQueries.modifyUser, [
            employee.id,
            employee.first_name,
            employee.last_name,
            employee.birth_date,
            employee.email,
            employee.phone_number,
            employee.national_registry_number,
            employee.password,
            employee.active,
        ]);

        await execute(client, userQueries.modifyUserRoles, [
            employee.id,
            employee.roles![0]
        ]);
        await execute(client, employeeQueries.modifyAddress, [
            employee.id,
            employee.addresses![0].street,
            employee.addresses![0].house_number,
            employee.addresses![0].city_id,
            employee.addresses![0].country
        ]);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
