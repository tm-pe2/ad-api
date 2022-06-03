import { Router } from "express";
import { getAllCustomers, getCustomerById } from "../services/customer";
import { Logger } from "../utils/logger";
import { RegisterCustomer, RegisterUser, UserIdRole, UserRole } from "../models/user";
import * as bcrypt from "bcrypt";
import * as AddressService from "../services/address";
import { Address } from "../models/address";
import * as UserService from "../services/user";

export class CustomerController {
    static router(): Router {
        return Router({caseSensitive: false})
            .get('/', (req, res, next) => {
                getAllCustomers()
                    .then((customers) => res.send(customers))
                    .catch((err) => {
                        Logger.error(err);
                        res.sendStatus(500);
                    });
            })
            .get('/:id', (req, res, next) => {
                let id = parseInt(req.params.id);
                if (isNaN(id)) {
                    res.sendStatus(400);
                    return;
                }
                getCustomerById(id)
                    .then((customer) => {
                        if (customer) {
                            res.send(customer);
                        } else {
                            res.sendStatus(404);
                        }
                    })
                    .catch((err) => {
                        Logger.error(err);
                        res.sendStatus(500);
                    });
            })
            .post('/', async (req, res, next) => {
                try {

                    const user: RegisterUser = req.body

                    //hash password
                    const salt = await bcrypt.genSalt(10);
                    const pass = await bcrypt.hash(user.password, salt);

                    user.password = pass


                    //get cityID by postal code
                    const cityID = await AddressService.getCityIDByPostalCode(req.body.city);
                    const address: Address = {
                        street: req.body.street,
                        house_number: req.body.house_number,
                        country: "Belgium",
                        city_id: cityID
                    }
                    // insert address
                    const addressID: number = await AddressService.insertAddress(address);
                    if (!addressID) {
                        throw new Error("Address not inserted");
                    }

                    const addr = {
                        id: addressID,
                        street: address.street,
                        house_number: address.house_number,
                        country: address.country,
                        city_id: address.city_id
                    }

                    user.addresses = [addr];
                    //insert user
                    const userID = await UserService.addUser(user);
                    if (!userID) {
                        throw new Error("User not inserted");
                    }
                    const userAddress = {
                        user_id: userID,
                        address_id: addressID
                    }

                    const userAddressInserted = await UserService.insertUserAddress(userAddress);
                    //insert user-addresses
                    if (!userAddressInserted) {
                        throw new Error("User-Address not inserted");
                    }

                    const customer: RegisterCustomer = {
                        id: userID,
                        type: req.body.type,
                    }
                    //insert customer
                    const customerInserted = await UserService.insertCustomer(customer)
                    if (!customerInserted) {
                        throw new Error("Customer not inserted");
                    }
                    
                    const userRole: UserIdRole = {
                        id: userID,
                        role: UserRole.CUSTOMER
                    }

                    const userRoleInserted = await UserService.insertUserRole(userRole);
                    
                    if(!userRoleInserted){
                        throw new Error("User-Role not inserted");
                    }
                    res.status(200).json({
                        message: "Customer inserted succesfully!"
                    });
                } catch (error) {
                    console.log(error);
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
