import { Router } from "express";
import * as userService from '../services/user';
import * as bcrypt from 'bcrypt';
import { AccessToken, AccessTokenData } from "../classes/accesstokens";
import { RefreshToken } from "../classes/refreshtokens";
import { Logger } from "../utils/logger";
import {commit, rollback, begin} from "../utils/database-connector";

// TODO: Testing!

export class AuthController {
    static router(): Router {
        return Router({ caseSensitive: false })
        .post('/login',  async (req, res, next) => {
            if (process.env.JWTSECRET == undefined) {
                throw new Error('JWTSECRET undefined');
            }
        
            const email = req.body.email;
            const password = req.body.password;
            const client = await begin();
            const user = await userService.getUserAuthInfoByEmail(client,email);

            if (!user) {
                rollback(client);
                res.status(401).send('Invalid credentials');
                return;
            }
            
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    rollback(client);
                    return res.sendStatus(500);
                }
                if (result) {
                    const tokenData: AccessTokenData = {id: user.id, roles: user.roles}
                    const accessToken = AccessToken.create(tokenData);
                    const refreshToken = RefreshToken.create(client, user.id);
                    commit(client);
                    res.json({accessToken, refreshToken});
                } else {
                    rollback(client);
                    res.status(401).send('Invalid credentials');
                }
            });
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
                })
        })
        .post('/token', async (req, res, next) => {
            if (process.env.JWTSECRET == undefined) {
                throw new Error('JWTSECRET undefined');
            }
            
            const token = req.body.refreshToken;
        
            if (!token)
                // unauthorized
                return res.status(401).send('Refresh token required.');
            
            const client = await begin();
            RefreshToken.get(client,token)
                .then(async (rt) => {
                    if (rt.expires.getTime() < (new Date()).getTime()) {
                        // forbidden
                        return res.status(403).send('Refresh token expired');
                    }
                    const client = await begin()
                    // Valid refresh token -> refresh token
                    userService.getUserAuthInfoById(client,rt.userId)
                    .then((user) => {
                        if (!user) {
                            Logger.error('User not found from existing refresh token');
                            rollback(client);
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

        })
    }
}
