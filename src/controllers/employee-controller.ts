import {Request, RequestHandler, Response} from 'express';
import {Employee, employeeSchema} from '../classes/employee';
import * as employeeValidation from '../validations/employee-validation';
import * as userService from '../services/user-service';
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
        const addEmployeeSchema = employeeSchema.fork(['user_id', 'address_id', 'employee_id'], field => field.optional());
        const validatedEmployee = await addEmployeeSchema.validateAsync(req.body);

        const validationResult = await employeeValidation.checkEmployeeData(validatedEmployee.user_id);
        if (validationResult != '') {
            throw new Error(String(validationResult));
        }

        const salt = await bcrypt.genSalt(10);
        validatedEmployee.password = await bcrypt.hash(validatedEmployee.password, salt);

        validatedEmployee.user_id = await userService.insertUser(validatedEmployee);
        const result = await employeeService.insertEmployee(validatedEmployee);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.log(error);
        if (error.message == "User already exists")
        {
            res.status(400).json({
                message: error.message
            });
        }
        else {
            res.status(500).json({
                message: 'There was an error when adding new employee'
            });
        }
    }
};

export const updateEmployee: RequestHandler = async (req: Request, res: Response) => {
    try {
        const employee: Employee = await employeeSchema.validateAsync(req.body);

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
        // const delRes = await userService.deleteUser(Number(req.params.id));
        const result = await employeeService.deleteEmployeeById(Number(req.params.id));

        res.status(200).json({
            //delRes,
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting employee'
        });
    }
};
