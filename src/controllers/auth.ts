import { Router } from "express";
import * as userService from '../services/user';
import * as bcrypt from 'bcrypt';
import { AccessToken } from "../classes/accesstokens";
import { RefreshToken } from "../classes/refreshtokens";

// TODO: update the way roles work when DB is updated
// TODO: test with front-end

export class AuthController {
    static router(): Router {
        return Router({ caseSensitive: false })
        .post('/login',  async (req, res, next) => {
            if (process.env.JWTSECRET == undefined) {
                throw new Error('JWTSECRET undefined');
            }
        
            const email = req.body.email;
            const password = req.body.password;
        
            const user = await userService.getUserByEmail(email);
            
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.sendStatus(500);
                }
                if (result) {
                    const tokenData = {'id': user.user_id, 'role_id': user.role_id}
                    const accessToken = AccessToken.create(tokenData);
                    const refreshToken = RefreshToken.create(user.user_id);
        
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
                    userService.getUserById(rt.userId)
                    .then((user) => {
                        const accessToken = AccessToken.create({id: user.user_id, role_id: user.role_id})
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
