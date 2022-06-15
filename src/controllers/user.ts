import { Request, Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ParsedQs } from "qs";
import { AccessTokenData } from "../classes/accesstokens";
import { authSelf, getAccessToken } from "../middleware/auth";
import { User } from "../models/user";
import { userQueries } from "../queries/users";
import * as userService from "../services/user";
import { begin, execute } from "../utils/database-connector";

export class UserController {
    static router(): Router {
        return Router({ caseSensitive: false })
            .get('/self', authSelf(), async (req, res, next) => {
                const client = await begin();
                userService.getUserById(client, req.body.tokenData.id)
                    .then((user: User | null) => {
                        if (user === null) {
                            res.status(404).send("User not found");
                        } else {
                            res.status(200).json(
                                user
                            );
                        }
                    })
                    .catch((err) => {
                        if (err instanceof Error) {
                            console.log(err.stack)
                        }
                        res.status(500).json({
                            message: 'There was an error when fetching user'
                        });
                    });
                client.release();
            })
            .patch('/status/:id', async (req, res, next) => {
                try {
                  const client = await begin();
                  const status = req.body.status
                  if (status instanceof Boolean) {
                      const id = await execute(client, userQueries.changeStatus, [req.params.id, status])
                      res.status(200).send({message: "set status of user: " + id + " to " + status})
                  } else{
                      res.status(406).json({message: "status is not a boolean"})
                  }
                } catch (error) {
                  res.status(500).json({message: "something went wrong updating the user",
                error: error})
                }
                  
              })
    }
}



