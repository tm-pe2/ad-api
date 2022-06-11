import { Router } from "express";
import { authSelf } from "../middleware/auth";
import { EstimationRegistration } from "../models/estimation"
import { calculateEstimation, getAllEstimations, insertEstimation } from "../services/estimation";
import { begin, commit, connectClient, rollback } from "../utils/database-connector";
import { Logger } from "../utils/logger";

export class EstimationController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get("/", async (req, res, next) => {
            const client = await connectClient();
            getAllEstimations(client)
                .then((estimations) => {
                    res.send(estimations);
                })
                .catch((err) => {
                    Logger.error(err);
                    res.sendStatus(500);
                });
        })
        .post("/", authSelf(), async (req, res, next) => {
            const client = await begin();
            try {
                const input: EstimationRegistration = req.body;
                // TODO validate
    
                const calc_estimation = calculateEstimation(input);

                const estimationId = insertEstimation(client, input, calc_estimation);
                if (!estimationId) {
                    throw new Error("Could not insert estimation");
                }

                commit(client);
            }
            catch (err) {
                Logger.error(err);
                rollback(client);
                res.sendStatus(500);
            }
        })
    }
}
