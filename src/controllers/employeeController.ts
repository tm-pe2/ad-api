import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Employee} from '../classes/employee';
import * as EmployeeService from '../services/employeeService';

export const getAllEmployees: RequestHandler = async (req: Request, res: Response) => {
    try {
        const addresses = await EmployeeService.getAllEmployees();

        res.status(200).json({
            addresses
        });
    } catch (error) {
        console.error('[EmployeeController][getAllEmployees][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching employees'
        });
    }
};

export const getEmployeeById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const employee = await EmployeeService.getEmployeeById(Number(req.params.id));

        res.status(200).json({
            employee
        });
    } catch (error) {
        console.error('[EmployeeController][getEmployeeById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when fetching employee'
        });
    }
};

export const addEmployee: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let obj = req.body
        console.log(obj);
        let employee: Employee = new Employee(null, obj.firstName, obj.lastName, obj.birthDate, obj.adressID, obj.email, obj.phoneNumber, obj.password, obj.department, obj.hireDate, obj.gender, obj.permissions);
        const result = await EmployeeService.insertEmployee(employee);

        res.status(200).json({
            result
        });
    } catch (error) {
        next(error);
        //console.error('[addressController][addAddress][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when adding new employee'
        });
    }
};

export const updateEmployee: RequestHandler = async (req: Request, res: Response) => {
    try {
        let obj = req.body
        console.log(obj);
        let employee: Employee = new Employee(obj.employeeId, obj.firstName, obj.lastName, obj.birthDate, obj.adressID, obj.email, obj.phoneNumber, obj.password, obj.department, obj.hireDate, obj.gender, obj.permissions);

        const result = await EmployeeService.updateEmployee(employee);

        res.status(200).json({
            result
        });
    } catch (error) {
        console.error('[employeeController][updateEmployee][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when updating employee'
        });
    }
};

export const deleteEmployeeById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const result = await EmployeeService.deleteEmployeeById(Number(req.params.id));

        res.status(200).json({
            result
        });
    } catch (error) {
        console.error('[employeeController][deleteEmployeeById][Error] ', typeof error === 'object' ? JSON.stringify(error) : error);
        res.status(500).json({
            message: 'There was an error when deleting employee'
        });
    }
};
