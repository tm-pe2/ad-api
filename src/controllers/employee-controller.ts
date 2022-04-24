import {Request, RequestHandler, Response} from 'express';
import {Employee, employeeSchema} from '../classes/employee';
import * as userService from '../services/user-service';
import {User, userSchema} from '../classes/user';
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
        const usr = {
            "RoleID": req.body.RoleID,
            "FirstName": req.body.FirstName,
            "LastName": req.body.LastName,
            "BirthDate": req.body.BirthDate,
            "AddressID": req.body.AddressID,
            "Email": req.body.Email,
            "PhoneNumber": req.body.PhoneNumber,
            "Password": req.body.Password,
        }
        const addUserSchema = userSchema.fork('UserID', field => field.optional());
        const userValidationResult = await addUserSchema.validateAsync(usr);
        let user: User = userValidationResult;

        if (Object.keys(await userService.getUserByEmail(user.Email)).length !== 0) {
            throw new Error("User already exists");
        }

        //generate the salt to hash the password
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(userValidationResult.Password,salt);
        
        //insert the user
        const insertResult = await userService.insertUser(user);
        if(insertResult !== true)
        {
            throw new Error("Error occured while adding user!");
        }

        const resul = await userService.getLastUserID();
        const val = JSON.parse(JSON.stringify(resul));
        const emp = {
            "EmployeeID": Number(val[0].UserID),
            "Departement": req.body.Departement,
            "Permissions": req.body.Permissions,
            "HireDate": req.body.HireDate,
            "Gender": req.body.Gender
        }

        const validationResult = await employeeSchema.validateAsync(emp);
        let employee: Employee = validationResult;

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
        const usr = {
            "UserID": req.body.UserID,
            "RoleID": req.body.RoleID,
            "FirstName": req.body.FirstName,
            "LastName": req.body.LastName,
            "BirthDate": req.body.BirthDate,
            "AddressID": req.body.AddressID,
            "Email": req.body.Email,
            "PhoneNumber": req.body.PhoneNumber,
            "Password": req.body.Password,
        }

        const addUserSchema = userSchema.fork('UserID', field => field.optional());
        const userValidationResult = await addUserSchema.validateAsync(usr);
        let user: User = userValidationResult;

        if (Object.keys(await userService.getUserByEmail(user.Email)).length !== 0) {
            throw new Error("User already exists");
        }

        //generate the salt to hash the password
        const salt = await bcrypt.genSalt(10);
        user.Password = await bcrypt.hash(userValidationResult.Password,salt);

        const updateResult = await userService.UpdateUser(user)
        if(updateResult !== true)
        {
            throw new Error("Error occured while adding user!");
        }
        const emp = {
            "EmployeeID": req.body.EmployeeID,
            "Departement": req.body.Departement,
            "Permissions": req.body.Permissions,
            "HireDate": req.body.HireDate,
            "Gender": req.body.Gender
        }

        //validate the request body
        const validationResult = await employeeSchema.validateAsync(emp);
        let employee: Employee = validationResult;
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
        const delRes = await userService.deleteUser(Number(req.params.id));
        const result = await employeeService.deleteEmployeeById(Number(req.params.id));

        res.status(200).json({
            delRes,
            result
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting employee'
        });
    }
};
