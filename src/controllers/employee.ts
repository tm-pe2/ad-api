import { Router } from "express";
import { begin, commit, rollback } from "../utils/database-connector";
import * as bcrypt from "bcrypt";
import * as UserService from "../services/user";
import * as AddressService from "../services/address";
import * as EmployeeService from "../services/employee";
import { Logger } from "../utils/logger";
import { Employee, UserRole } from "../models/user";
import { customerQueries } from "../queries/customer";
export class EmployeeController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', (req, res, next) => {
            
        })
        .post('/', async (req, res, next) => {
            const client = await begin();
            try {
                const employee: Employee = req.body;

                //hash password
                if (!employee.password) {
                    res.sendStatus(400);
                    return;
                }
                const salt = await bcrypt.genSalt(10);
                const pass = await bcrypt.hash(employee.password, salt);
                employee.password = pass;

                if(!employee.addresses){
                    res.sendStatus(400);
                    return;
                }
                //insert user 
                const userId = await UserService.addUser(client, employee);
                if(!userId) {
                    throw new Error("User not inserted")
                }
                employee.id = userId;
                for(let i = 0; i < employee.addresses.length; i++) {
                    const address = employee.addresses[i];
                    address.country = "Belgium";
                    const addressId = await AddressService.insertAddress(client, address);
                    if(!addressId) {
                        throw new Error("Address not inserted, possibly invalid city id");
                    }
                    employee.addresses[i].id = addressId;

                    const userAddressInserted = await UserService.insertUserAddress(client, employee.id, addressId);
                    if(!userAddressInserted) {
                        throw new Error("User-Address not inserted");
                    }
                }    
                
                const employeeInserted = await EmployeeService.insertEmployee(client, employee.id, employee.hire_date, employee.salary);
                if(!employeeInserted) {
                    throw new Error("Employee not inserted");
                }
                for(let i = 0; i < employee.roles!.length; i++) {
                    const role: UserRole = employee.roles![i];
                    const roleId = await UserService.insertUserRole(client, employee.id, role);
                    if(!roleId) {
                        throw new Error(`User-Role not inserted: ${role}`);
                    }
                    employee.roles![i] = role;
                }
                await commit(client);
                res.send(employee);
            } catch (err) {
                Logger.error(err);
                await rollback(client);
                res.sendStatus(500);
            }
        })
    }
}
