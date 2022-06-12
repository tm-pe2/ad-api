import { Router } from "express";
import { authSelf } from "../middleware/auth";
import { EstimationRegistration } from "../models/estimation"
import { getUserIdFromAddressId } from "../services/address";
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
                console.log(input);
                // TODO validate
    
                // Check address
                const userFromAddress = await getUserIdFromAddressId(client, input.address_id);
                if (userFromAddress === null) {
                    res.status(400).send("Address not found");
                    return;
                }
                if (userFromAddress !== req.body.tokenData.id) {
                    res.status(403).send("Address not owned by user");
                    return;
                }

                // Insert estimation
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
