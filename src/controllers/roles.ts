import { Router } from "express";
import { getAllRoles } from "../services/roles";
import { connectClient } from "../utils/database-connector";
import { Logger } from "../utils/logger";

export class RolesController{
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', async (req, res, next) => {
            const client = await connectClient();
            getAllRoles(client)
                .then((roles) => {
                    res.send(roles)
                })
                .catch((err) => {
                    Logger.error(err);
                    res.sendStatus(500);
                });
            client.release();
        })
    }
}
