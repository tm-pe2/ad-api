import { Router } from "express";
import { ValidateInterface } from "../classes/validate";
import { Consumption, ConsumptionPost } from "../models/consumption";
import {  addIndexedValue, getConsumptionById } from "../services/consumption";
import { begin, commit, connectClient, rollback } from "../utils/database-connector";
import { Logger } from "../utils/logger";

export class ConsumptionController {
    static router(): Router {
        return Router({ caseSensitive: false })
            .get('/self', async (req, res, next) => {
                const client = await connectClient();
                getConsumptionById(client, req.body.tokenData.id).then((consumption) => {
                    if (consumption) {
                        res.status(200).send(consumption);
                    }
                    else {
                        res.status(404).send("Consumption not found");
                    }

                }).catch((err) => {
                    Logger.error(err);
                    res.sendStatus(500);
                });
                client.release();
            })
            .get('/:id', async (req, res, next) => {
                const id = parseInt(req.params.id);
                if (isNaN(id)) {
                    res.sendStatus(400);
                    return;
                }
                const client = await connectClient();
                getConsumptionById(client, id).then((consumption) => {
                    if (consumption) {
                        res.send(consumption);
                    }
                    else {
                        res.sendStatus(404);
                    }
                }).catch((err) => {
                    Logger.error(err);
                    res.sendStatus(500);
                });
                client.release();

            })
            .post('/', async (req, res, next) => {
                const client = await begin();
                try {
                    const consumption: ConsumptionPost = req.body;
                    try {
                        ValidateInterface.checkConsumption(consumption);
                    }
                    catch (err) {
                        if(err instanceof Error){
                            res.status(400).json({
                                message: err.message
                            });
                        }
                        else{
                            Logger.warn(err);
                            res.sendStatus(400);
                        }
                        return;
                    }
                    consumption.read_date = new Date();
                    for(const meter of consumption.meters) {
                        const consumptionInserted = await addIndexedValue(client, meter, consumption.read_date);
  
                        if (!consumptionInserted) {
                            throw new Error("Consumption not inserted");
                        }
                    }
                    await commit(client);
                    res.status(200).send("Consumption inserted");
                }
                catch (error) {
                    rollback(client)
                    if (error instanceof Error) {
                        res.status(500).json({
                            message: error.message
                        });
                    }
                    else {
                        res.status(500).json({
                            message: "Unknown error"
                        });
                    }
                }
                client.release();
            })
    }
}

