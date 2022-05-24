import { Router } from "express";

export class InvoiceController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', (req, res, next) => {
            
        })
    }
}
