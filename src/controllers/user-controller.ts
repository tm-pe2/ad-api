import {Request, RequestHandler, Response} from 'express';
import {User, userSchema} from '../classes/user';
import * as userValidation from '../validations/user-validation';
import * as addressServices from '../services/address-service';
import * as userService from '../services/user-service';
import * as bcrypt from 'bcrypt';
import { getAccessToken } from '../middleware/auth';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            users
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching employees'
        });
    }
};

export const getUserById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));

        res.status(200).json({
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'There was an error when fetching employee'
        });
    }
};

export const getUserSelf: RequestHandler = async (req: Request, res: Response) => {
    if (process.env.JWTSECRET == undefined) {
        throw new Error('JWTSECRET undefined');
    }
    getAccessToken(req)
        .then((token) => {
            jwt.verify(token, process.env.JWTSECRET!, (err: any, decoded: any) => {
                if (err) {
                    if (err instanceof TokenExpiredError) {
                        return res.status(401).send('Unauthorized: Access token expired.')
                    }
                    return res.status(401).send('Unauthorized.')
                }

                if (decoded.id != undefined) {
                    userService.getUserById(decoded.id)
                        .then((user) => {
                            res.status(200).json({
                                user
                            });
                        })
                        .catch((err) => {
                            res.status(500).json({
                                message: 'There was an error when fetching user'
                            });
                        });
                }
                else {
                    res.status(403).send('Forbidden: Resource access denied, insufficient rights.')
                }
            })
        })
        .catch((err) => {
            res.status(401).send(err);
        })
};


export const addUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        // input validation
        const addUserSchema = userSchema.fork(['user_id', 'address_id'], field => field.optional());
        const validatedUser = await addUserSchema.validateAsync(req.body);

        //user logic validation
        const validationResult = await userValidation.checkUserData(validatedUser);
        if (validationResult != '') {
            throw new Error(String(validationResult));
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        validatedUser.password = await bcrypt.hash(validatedUser.password, salt);

        //insert address and user
        validatedUser.address_id = await addressServices.insertAddress(validatedUser);
        const result = await userService.insertUser(validatedUser);

        res.status(200).json({
            result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error adding a user'
        });
    }
};
