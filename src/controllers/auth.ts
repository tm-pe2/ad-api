import { Router } from "express";
import * as userService from '../services/user';
import * as bcrypt from 'bcrypt';
import { AccessToken, AccessTokenData } from "../classes/accesstokens";
import { RefreshToken } from "../classes/refreshtokens";
import { Logger } from "../utils/logger";
import {commit, rollback, begin, connectClient, end} from "../utils/database-connector";

// TODO: Testing!

export class AuthController {
    static router(): Router {
        return Router({ caseSensitive: false })
        .post('/login',  async (req, res, next) => {
            const email = req.body.email;
            const password = req.body.password;
            if (email == undefined || password == undefined) {
                res.status(400).send('No email or password');
            }

            const client = await connectClient();
            console.log("start");
            const user = await userService.getUserAuthInfoByEmail(client,email);

            if (!user) {
                res.status(401).send('Invalid credentials');
                return;
            }
            console.log("we have a user")
            
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.sendStatus(500);
                }
                if (result) {
                    console.log("There is a result")
                    const tokenData: AccessTokenData = {id: user.id, roles: user.roles}
                    const accessToken: string = AccessToken.create(tokenData);
                    RefreshToken.create(client, user.id)
                        .then(refreshToken => {
                            res.json({
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            });
                        })
                        .catch((err) => {
                            Logger.error(err);
                            res.sendStatus(500);
                        });
                } else {
                    res.status(401).send('Invalid credentials');
                }
            });

            client.release();
        })
        .post('/logout', async (req, res, next) => {
            const token = req.body.refreshToken;
            const client = await begin();

            // Logs out the session by deleting the refresh token
            RefreshToken.delete(client,token)
                .then(() => {
                    commit(client);
                    res.sendStatus(200);
                })
                .catch((err) => {
                    rollback(client);
                    res.sendStatus(400);
                });

            client.release();
        })
        .post('/token', async (req, res, next) => {
            const token = req.body.refreshToken;
        
            if (!token)
                // unauthorized
                return res.status(401).send('Refresh token required.');
            
            const client = await connectClient();
            RefreshToken.get(client,token)
                .then(async (rt) => {
                    if (rt.expires.getTime() < (new Date()).getTime()) {
                        // forbidden
                        return res.status(403).send('Refresh token expired');
                    }
                    // Valid refresh token -> refresh token
                    userService.getUserAuthInfoById(client,rt.userId)
                    .then((user) => {
                        if (!user) {
                            Logger.error('User not found from existing refresh token');
                            return res.sendStatus(500);
                        }
                        const accessToken = AccessToken.create({
                            id: user.id,
                            roles: user.roles
                        })
                        res.json({accessToken});
                    })
                    .catch((err) => {
                        return res.sendStatus(500);
                    });
                })
                .catch((err) => {
                    // not found -> forbidden
                    return res.status(403).send('Refresh token invalid'); 
                });

            client.release();
        })
    }
}
