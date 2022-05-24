import { Router } from "express";

export class EmployeeController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', (req, res, next) => {
            
        })
    }
}
