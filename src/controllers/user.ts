import { Router } from "express";

export class UserController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', (req, res, next) => {
            
        })
    }
}
