import { Router } from "express";
import { getAllCustomers, getCustomerById } from "../services/customer";
import { Logger } from "../utils/logger";

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
            getCustomerById(parseInt(req.params.id))
                .then((customer) => res.send(customer))
                .catch((err) => {
                    Logger.error(err);
                    res.sendStatus(500);
                });
        });
    }
}
