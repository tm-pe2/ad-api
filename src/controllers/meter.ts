import { Router } from "express";

export class MeterController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', (req, res, next) => {
            
        })
    }
}
