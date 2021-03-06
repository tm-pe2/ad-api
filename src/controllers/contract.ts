import { Router } from "express";
import { authSelf } from "../middleware/auth";
import { Contract } from "../models/contract";
import { getAllContracts, getContractById, getContractByUserId } from "../services/contract";
import {begin,commit,connectClient,rollback} from "../utils/database-connector";
import { Logger } from "../utils/logger";
import * as ContractService from '../services/contract';

export class ContractController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/', async (req, res, next) => {
            const client = await connectClient();
            getAllContracts(client)
                .then((contracts) => {
                    res.send(contracts);
                })
                .catch((err) => {
                    Logger.error(err);
                    res.sendStatus(500);
                });
            client.release();
        })
        .get('/self', authSelf(), async (req, res, next) => {
            const client = await connectClient();
            getContractByUserId(client, req.body.tokenData.id)
                .then((contracts) => {
                    if (contracts) {
                        res.send(contracts);
                    }
                    else {
                        res.sendStatus(404);
                    }
                })
                .catch((err) => {
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
            getContractById(client, id)
                .then((contracts) => {
                    if (contracts) {
                        res.send(contracts);
                    }
                    else {
                        res.sendStatus(404);
                    }
                })
                .catch((err) => {
                    Logger.error(err);
                    res.sendStatus(500);
                });
            client.release();
        })
    }
}
