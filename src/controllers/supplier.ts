import { Router } from "express";

export class SupplierController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', (req, res, next) => {
            
        })
    }
}
