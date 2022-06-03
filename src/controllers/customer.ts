import { Router } from "express";
import {  RegisterCustomer, RegisterUser,UserIdRole, UserRole } from "../models/user";
import * as bcrypt from "bcrypt";
import * as AddressService from "../services/address";
import { Address } from "../models/address";
import * as UserService from "../services/user";
import {begin,commit,rollback} from "../utils/database-connector";

export class CustomerController {
    static router(): Router {
        return Router({ caseSensitive: false })
            .get('/', (req, res, next) => {

            })
            .post('/', async (req, res, next) => {
                const client = await begin()
                try {
                    

                    const user: RegisterUser = req.body

                    //hash password
                    const salt = await bcrypt.genSalt(10);
                    const pass = await bcrypt.hash(user.password, salt);

                    user.password = pass


                    //get cityID by postal code
                    const cityID = await AddressService.getCityIDByPostalCode(client,req.body.city);
                    const address: Address = {
                        street: req.body.street,
                        house_number: req.body.house_number,
                        country: "Belgium",
                        city_id: cityID
                    }
                    // insert address
                    const addressID: number = await AddressService.insertAddress(client, address);
                    if (!addressID) {
                        throw new Error("Address not inserted");
                    }

                    address.id = addressID;

                    user.addresses = [address];
                    //insert user
                    const userID = await UserService.addUser(client,user);
                    if (!userID) {
                        throw new Error("User not inserted");
                    }
                    const userAddress = {
                        user_id: userID,
                        address_id: addressID
                    }

                    const userAddressInserted = await UserService.insertUserAddress(client,userAddress);
                    //insert user-addresses
                    if (!userAddressInserted) {
                        throw new Error("User-Address not inserted");
                    }

                    const customer: RegisterCustomer = {
                        id: userID,
                        type: req.body.type,
                    }
                    //insert customer
                    const customerInserted = await UserService.insertCustomer(client,customer)
                    if (!customerInserted) {
                        throw new Error("Customer not inserted");
                    }
                    
                    const userRole: UserIdRole = {
                        id: userID,
                        role: UserRole.CUSTOMER
                    }

                    const userRoleInserted = await UserService.insertUserRole(client,userRole);
                    
                    if(!userRoleInserted){
                        throw new Error("User-Role not inserted");
                    }

                    commit(client)
                    res.status(200).json({
                        message: "Customer inserted succesfully!"
                    });
                } catch (error) {
                    rollback(client)
                    if(error instanceof Error){
                        res.status(500).json({
                            message: error.message
                        });
                    }
                    else{
                        res.status(500).json({
                            message: "Unknown error"
                        });
                    }
                }

            })
    }
}
