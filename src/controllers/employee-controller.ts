import {Request, RequestHandler, Response} from 'express';
import {Employee, employeeSchema, updateEmployeeSchema} from '../classes/employee';
import * as userService from '../services/user-service';
import * as userValidation from '../validations/user-validation';
import * as addressServices from '../services/address-service';
import * as employeeService from '../services/employee-service';
import * as userAddressService from '../services/user-address-service';
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

        const validationResult = await userValidation.checkUserData(validatedEmployee);
        if (validationResult != '') {
            throw new Error(String(validationResult));
        }

        const salt = await bcrypt.genSalt(10);
        validatedEmployee.password = await bcrypt.hash(validatedEmployee.password, salt);

        //insert address
        const addressID = await addressServices.insertAddress(validatedEmployee);
        if(addressID){
            validatedEmployee.address_id = addressID;

            //insert user
            const userID = await userService.addUser(validatedEmployee);
            if(userID){
                
                validatedEmployee.user_id = userID;
                //insert user-addresses
                if(await userAddressService.insertUserAddress(validatedEmployee)){
                    
                    //insert employee
                    if(await employeeService.insertEmployee(validatedEmployee)){
                        
                        res.status(200).json({
                            message: "Employee inserted succesfully!"
                        });
                    }
                    else{
                        res.status(401).json({
                            message: "An error occured while insering employee!"
                        });
                    }
                }
                else{
                    res.status(401).json({
                        message: "An error occured while insering user-address!"
                    });
                }
            }
            else{
                res.status(401).json({
                    message: "An error occured while insering user!"
                });
            }
        }
        else{
            res.status(401).json({
                message: "An error occured while insering address!"
            });
        }   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when inserting new employee!'
        });
    }
};

export const updateEmployee: RequestHandler = async (req: Request, res: Response) => {
    try {
        const employee: Employee = await updateEmployeeSchema.validateAsync(req.body);

        if(await employeeService.updateEmployee(employee)){
            res.status(200).json({
                message: "Emplyee updataed succesfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occured!"
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when updating employee!'
        });
    }
};

export const deleteEmployeeById: RequestHandler = async (req: Request, res: Response) => {
    try {
        if(await employeeService.deleteEmployeeById(Number(req.params.id))){
            res.status(200).json({
                message: "Emplyee deleted succesfully!"
            });
        }
        else{
            res.status(401).json({
                message: "An error occured!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when deleting employee!'
        });
    }
};
