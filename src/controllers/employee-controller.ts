import {Request, RequestHandler, Response} from 'express';
import {Employee, employeeSchema} from '../classes/employee';
import * as employeeService from '../services/employee-service';
import * as bcrypt from 'bcrypt';

export const getAllEmployees: RequestHandler = async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.getAllEmployees();

        res.status(200).json({
            employees
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching employees'
        });
    }
};

export const getEmployeeById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.getEmployeeById(Number(req.params.id));

        res.status(200).json({
            employee
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching employee'
        });
    }
};

export const addEmployee: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const addEmployeeSchema = employeeSchema.fork('EmployeeID', field => field.optional());
        const validationResult = await addEmployeeSchema.validateAsync(req.body);
        let employee: Employee = validationResult;

        if (!((await employeeService.getEmployeeByEmail(employee.Email)).EmployeeID == undefined)) {
            throw new Error("Customer already exists");
        }

        //generate the salt to hash the password
        const salt = await bcrypt.genSalt(10);
        employee.Password = await bcrypt.hash(validationResult.Password,salt);

        //insert employee
        const result = await employeeService.insertEmployee(employee);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when adding new employee'
        });
    }
};

export const updateEmployee: RequestHandler = async (req: Request, res: Response) => {
    try {
        //validate the request body
        const validationResult = await employeeSchema.validateAsync(req.body);
        let employee: Employee = validationResult;

        //generate the salt to hash the password
        const salt = await bcrypt.genSalt(10);
        employee.Password = await bcrypt.hash(validationResult.Password,salt);

        //update employee
        const result = await employeeService.updateEmployee(employee);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating employee'
        });
    }
};

export const deleteEmployeeById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await employeeService.deleteEmployeeById(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting employee'
        });
    }
};