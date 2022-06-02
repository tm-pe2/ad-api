import { Request, Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ParsedQs } from "qs";
import { AccessTokenData } from "../classes/accesstokens";
import { getAccessToken } from "../middleware/auth";
import { User } from "../models/user";
import * as userService from "../services/user";

export class UserController {
    static router(): Router {
        return Router({caseSensitive: false})
        .get('/self', (req, res, next) => {
            if (process.env.JWTSECRET == undefined) {
                throw new Error('JWTSECRET undefined');
            }
            this.verifyToken(req).then(token => {
                if (token.id != undefined) {
                            userService.getUserById(token.id)
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
                        }
                        else {
                            res.status(403).send('Forbidden: Resource access denied, insufficient rights.')
                        }
            })
        
                        
                    
                
            })
        }
     
 
}
