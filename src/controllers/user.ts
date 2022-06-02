import { Request, Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ParsedQs } from "qs";
import { AccessTokenData } from "../classes/accesstokens";
import { authSelf, getAccessToken } from "../middleware/auth";
import { User } from "../models/user";
import * as userService from "../services/user";

export class UserController {
    static router(): Router {
        return Router({ caseSensitive: false })
            .get('/self', authSelf(), (req, res, next) => {
                if (process.env.JWTSECRET == undefined) {
                    throw new Error('JWTSECRET undefined');
                }

                userService.getUserById(req.body.tokenData.id)
                    .then((user: User) => {
                        res.status(200).json(
                            user
                        );
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: 'There was an error when fetching user'
                        });
                    });

            })




    })
}


    //TODO move to auth?
    static async verifyToken(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>): Promise < AccessTokenData > {
    return new Promise((resolve, reject) => {
        getAccessToken(req)
            .then((token) => {
                jwt.verify(token, process.env.JWTSECRET!, (err: any, decoded: any) => {
                    if (err) {
                        if (err instanceof TokenExpiredError) {
                            reject('Unauthorized: Access token expired.')
                        }
                        reject('Unauthorized.')
                    }
                    resolve(decoded as AccessTokenData);
                })
            })
    })
}
}
