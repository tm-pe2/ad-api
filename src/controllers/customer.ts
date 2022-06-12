import { Router } from "express";
import {  Customer, RegisterUser,UserIdRole, UserRole } from "../models/user";
import { getAllCustomers, getCustomerById } from "../services/customer";
import * as CustomerService from "../services/customer";
import { Logger } from "../utils/logger";
import * as bcrypt from "bcrypt";
import * as AddressService from "../services/address";
import { Address } from "../models/address";
import * as UserService from "../services/user";
import {begin,commit,connectClient,rollback} from "../utils/database-connector";

export class CustomerController {
    static router(): Router {
        return Router({caseSensitive: false})
            .get('/', async (req, res, next) => {
                const client = await connectClient();
                getAllCustomers(client)
                    .then((customers) => {
                        res.send(customers)
                    })
                    .catch((err) => {
                        Logger.error(err);
                        res.sendStatus(500);
                    });
            })
            .get('/:id', async (req, res, next) => {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    res.sendStatus(400);
                    return;
                }
                const client = await connectClient();
                getCustomerById(client,id)
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
                const client = await begin()
                try {
                    const customer: Customer = req.body
                    // TODO: Create function that takes Customer and validates it

                    //hash password
                    if (!customer.password) {
                        res.sendStatus(400);
                        return;
                    }
                    const salt = await bcrypt.genSalt(10);
                    const pass = await bcrypt.hash(customer.password, salt);
                    customer.password = pass;
                    
                    if (!customer.addresses) {
                        res.sendStatus(400);
                        return;
                    }

                    //insert user
                    const userID = await UserService.addUser(client, customer);
                    if (!userID) {
                        throw new Error("User not inserted");
                    }
                    customer.id = userID;

                    for (let i = 0; i < customer.addresses.length; i++) {
                        const address: Address = customer.addresses[i];
                        address.country = "Belgium"; // We assume only Belgium
                        const addressId = await AddressService.insertAddress(client, address);
                        if (!addressId) {
                            throw new Error("Address not inserted, possibly invalid city id");
                        }
                        customer.addresses[i].id = addressId;

                        const userAddressInserted = await UserService.insertUserAddress(client, customer.id, addressId);
                        //insert user-addresses
                        if (!userAddressInserted) {
                            throw new Error("User-Address not inserted");
                        }
                    }

                    //insert customer
                    const customerInserted = await CustomerService.insertCustomer(client,customer.id, customer.customer_type);
                    if (!customerInserted) {
                        throw new Error("Customer not inserted");
                    }

                    const userRoleInserted = await UserService.insertUserRole(client,customer.id, UserRole.CUSTOMER);
                    if(!userRoleInserted){
                        throw new Error("User-Role not inserted");
                    }

                    commit(client);

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
