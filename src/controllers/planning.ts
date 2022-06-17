import { Router } from "express";
import { connectClient } from "../utils/database-connector";
import * as PlanningService from "../services/planning";
import { Logger } from "../utils/logger";
export class PlanningController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', async (req, res, next) => {
            const client = await connectClient();
            try {
                res.send(await PlanningService.getAllPlannings(client));
            }
            catch(err) {
                Logger.error(err);
                res.sendStatus(500);
            }
            client.release();
        })
        .patch('/:id', async (req, res, next) => {
            const client = await connectClient();
            try {
                // TODO validate
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    res.sendStatus(400);
                    return;
                }
                const status = parseInt(req.body.status);
                const planning = await PlanningService.changePlanningStatus(client, id, status);
                if (!planning) {
                    throw new Error("Could not change planning status");
                }
                res.sendStatus(200);
            }
            catch(err) {
                Logger.error(err);
                res.sendStatus(500);
            }
            client.release();
        })
    }
}
