import { Router } from "express";
import { authSelf } from "../middleware/auth";
import { EstimationRegistration } from "../models/estimation"
import { getUserIdFromAddressId } from "../services/address";
import { addNewContract } from "../services/contract";
import { calculateEstimation, insertEstimation } from "../services/estimation";
import { createPlanning } from "../services/planning";
import { addNewMeter } from "../services/meter";
import { begin, commit, rollback } from "../utils/database-connector";
import { Logger } from "../utils/logger";
import { PlanningStatus } from "../models/planning";

export class EstimationController {
    static router(): Router {
        return Router({caseSensitive: false})
        .post("/", async (req, res, next) => {
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
                // Insert estimation
                const calc_estimation = calculateEstimation(input);

                const estimationId = await insertEstimation(client, input, calc_estimation);
                if (estimationId === null) {
                    throw new Error("Could not insert estimation");
                }

                // Add new contract
                const contractId = await addNewContract(client,
                    userFromAddress, input.service_type, estimationId, input.address_id);

                if (contractId === null) {
                    throw new Error("Could not add contract");
                }

                // Add meters
                for (const meter of input.meters) {
                    const meterId = await addNewMeter(client, contractId, meter.meter_type, input.family_size);
                    if (meterId === null) {
                        throw new Error("Could not add meter");
                    }
                }

                // Create planning for day after the contract gets made
                const date = new Date();
                date.setDate(date.getDate() + 1);

                const planningId = await createPlanning(client, contractId, date, PlanningStatus.SCHEDULED);
                if (planningId === null) {
                    throw new Error("Could not create planning");
                }

                commit(client);
                res.sendStatus(200);
            }
            catch (err) {
                Logger.error(err);
                rollback(client);
                res.sendStatus(500);
            }
            client.release();
        })
    }
}
