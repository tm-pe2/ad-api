import { Router } from "express";

export class AddressController {
    static router(): Router {
        return Router({ caseSensitive: false })
        .get('/',  async (req, res, next) => {

        })
    }
}
