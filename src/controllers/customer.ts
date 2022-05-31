import { Router } from "express";
import { Customer, RegisterCustomer, RegisterUser, User } from "../models/user";
import * as bcrypt from "bcrypt";
import * as AddressService from "../services/address";
import { Address } from "../models/address";
import * as UserService from "../services/user";
export class CustomerController {
    static router(): Router {
        return Router({ caseSensitive: false })
            .get('/', (req, res, next) => {

            })
            .post('/', async (req, res, next) => {
                try {

                    const user: RegisterUser = req.body

                    //hash password
                    const salt = await bcrypt.genSalt(10);
                    const pass = await bcrypt.hash(user.password, salt);

                    user.password = pass

                    //insert address

                    //get cityID by postal code
                    const cityID = await AddressService.getCityIDByPostalCode(req.body.city);
                    const address: Address = {
                        street: req.body.street,
                        house_number: req.body.house_number,
                        country: req.body.country,
                        city_id: cityID
                    }
                    const addressID: number = await AddressService.insertAddress(address);
                    if (addressID) {

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
                        if (userID) {
                            const userAddress = {
                                user_id: userID,
                                address_id: addressID
                            }

                            const addressInserted = await UserService.insertUserAddress(userAddress);
                            //insert user-addresses
                            if (addressInserted) {
                                
                                const customer: RegisterCustomer = {
                                    id: userID,
                                    type: req.body.customerType,
                                }
                                //insert customer
                                if (await UserService.insertCustomer(customer)) {

                                    res.status(200).json({
                                        message: "Customer inserted succesfully!"
                                    });
                                }
                                else {
                                    res.status(401).json({
                                        message: "An error occured while insering customer!"
                                    });
                                }
                            }
                            else {
                                res.status(401).json({
                                    message: "An error occured while insering user-address!"
                                });
                            }
                        }
                        else {
                            res.status(401).json({
                                message: "An error occured while insering user!"
                            });
                        }
                    }
                    else {
                        res.status(401).json({
                            message: "An error occured while insering address!"
                        });
                    }
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        message: 'There was an error when inserting customer'
                    });
                }

            })
    }
}
