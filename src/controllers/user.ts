import { Router } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { getAccessToken } from "../middleware/auth";
import * as userService from "../services/user";

export class UserController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/self', (req, res, next) => {
            if (process.env.JWTSECRET == undefined) {
                throw new Error('JWTSECRET undefined');
            }
            getAccessToken(req)
                .then((token) => {
                    jwt.verify(token, process.env.JWTSECRET!, (err: any, decoded: any) => {
                        if (err) {
                            if (err instanceof TokenExpiredError) {
                                return res.status(401).send('Unauthorized: Access token expired.')
                            }
                            return res.status(401).send('Unauthorized.')
                        }
        
                        if (decoded.id != undefined) {
                            userService.getUserById(decoded.id)
                                .then((user) => {
                                    res.status(200).json(
                                        user
                                    );
                                })
                                .catch((err) => {
                                    res.status(500).json({
                                        message: 'There was an error when fetching user'
                                    });
                                });
                        }
                        else {
                            res.status(403).send('Forbidden: Resource access denied, insufficient rights.')
                        }
                    })
                })
                .catch((err) => {
                    res.status(401).send(err);
                })
        })
    }
}
