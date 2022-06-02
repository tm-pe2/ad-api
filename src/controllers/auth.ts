import { Router } from "express";
import * as userService from '../services/user';
import * as bcrypt from 'bcrypt';
import { AccessToken, AccessTokenData } from "../classes/accesstokens";
import { RefreshToken } from "../classes/refreshtokens";
import { Logger } from "../utils/logger";

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
        
            const user = await userService.getUserAuthInfoByEmail(email);

            if (!user) {
                res.status(401).send('Invalid credentials');
                return;
            }
            
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.sendStatus(500);
                }
                if (result) {
                    const tokenData: AccessTokenData = {id: user.id, roles: user.roles}
                    const accessToken = AccessToken.create(tokenData);
                    const refreshToken = RefreshToken.create(user.id);
        
                    res.json({accessToken, refreshToken});
                } else {
                    res.status(401).send('Invalid credentials');
                }
            });
        })
        .post('/logout', async (req, res, next) => {
            const token = req.body.refreshToken;

            // Logs out the session by deleting the refresh token
            RefreshToken.delete(token)
                .then(() => {
                    res.sendStatus(200);
                })
                .catch((err) => {
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

            RefreshToken.get(token)
                .then((rt) => {
                    if (rt.expires.getTime() < (new Date()).getTime()) {
                        // forbidden
                        return res.status(403).send('Refresh token expired');
                    }
                    
                    // Valid refresh token -> refresh token
                    userService.getUserAuthInfoById(rt.userId)
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

        })
    }
}
