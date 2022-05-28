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
        });
    }
}
