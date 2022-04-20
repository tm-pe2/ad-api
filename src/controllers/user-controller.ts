// import {Request, RequestHandler, Response} from 'express';
// import {User, userSchema} from '../classes/user';
// import * as userService from '../services/user-service';
// import * as bcrypt from 'bcrypt';

// export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
//     try {
//         const users = await userService.getAllUsers();

//         res.status(200).json({
//             users
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'There was an error when fetching users'
//         });
//     }
// };

// export const getUserById: RequestHandler = async (req: Request, res: Response) => {
//     try {
//         const user = await userService.getUserById(Number(req.params.id));

//         res.status(200).json({
//             user
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'There was an error when fetching user'
//         });
//     }
// };

// export const addUser: RequestHandler = async (req: Request, res: Response) => {
//     try {
//         const addUserSchema = userSchema.fork('UserID', field => field.optional());
//         const validationResult = await addUserSchema.validateAsync(req.body);
//         let user: User = validationResult;

//         if (Object.keys(await userService.getUserByEmail(user.Email)).length !== 0) {
//             throw new Error("User already exists");
//         }

//         //generate the salt to hash the password
//         const salt = await bcrypt.genSalt(10);
//         user.Password = await bcrypt.hash(validationResult.Password,salt);
        
//         //insert the user
//         const result = await userService.insertUser(user);

//         res.status(200).json({
//             result
//         });
//         return true;
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'There was an error when adding new customer!'
//         });
//         return false;
//     }
// };

// export const updateUser: RequestHandler = async (req: Request, res: Response) => {
//     try {
//         //validate the request body
//         const validationResult = await userSchema.validateAsync(req.body);
//         let user: User = validationResult;

//         //generate the salt to hash the password
//         const salt = await bcrypt.genSalt(10);
//         user.Password = await bcrypt.hash(validationResult.Password,salt);

//         //update customer
//         const result = await userService.UpdateUser(user);

//         res.status(200).json({
//             result
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'There was an error when updating customer'
//         });
//     }
// };

// export const DeleteUserById: RequestHandler = async (req: Request, res: Response) => {
//     try {
//         const result = await userService.deleteUser(Number(req.params.id));

//         res.status(200).json({
//             result
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: 'There was an error when deleting customer'
//         });
//     }
// };
