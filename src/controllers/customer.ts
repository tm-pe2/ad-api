import { Router } from "express";
import { getAllCustomers } from "../services/customer";
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
    }
}
