import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { AccessTokenData } from '../classes/accesstokens';
import { UserRole } from '../models/user';

function authorize(roles: UserRole[]): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (process.env.JWTSECRET == undefined) {
            throw new Error('JWTSECRET undefined');
        }
        
        getToken(req)
            .then((token) => {
                jwt.verify(token, process.env.JWTSECRET!, (err: any, decoded: any) => { //change any?
                    if (err) {
                        if (err instanceof TokenExpiredError) {
                            return res.status(401).send('Unauthorized: Access token expired.')
                        }
                        return res.status(401).send('Unauthorized.')
                    }

                    if (decoded.id != undefined
                        && roles.some((role) => { decoded.roles.includes(role) })) { // TODO: test
                        next();
                    }
                    else {
                        return res.status(403).send('Forbidden: Resource access denied, insufficient rights.')
                    }
                })
            })
            .catch((err) => {
                return res.status(401).send(err); // unauthorized
            })
    }
}

export function getToken(req: Request): Promise<string> {
    const promise = new Promise<string>((resolve, reject) => {
        const authHeader = req.headers.authorization;
        if (authHeader != undefined) {
            const token = authHeader.split(' ')[1]; // 'Bearer token'
            resolve(token);
        }
        else {
            reject('Unauthorized: No authorization header')
        }
    });
    return promise;
}
export function authSelf(): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction) => {   
        getToken(req)
            .then((token) => {
                jwt.verify(token, process.env.JWTSECRET!, (err: any, decoded: any) => { //change any?
                    if (err) {
                        if (err instanceof TokenExpiredError) {
                            return res.status(401).send('Unauthorized: Access token expired.')
                        }
                        return res.status(401).send('Unauthorized.')
                    }

                    if (decoded.id != undefined
                        && decoded.roles.length != 0) { // TODO: test
                            req.body.tokenData = {
                                id: decoded.id,
                                roles: decoded.roles
                            } as AccessTokenData
                        next();
                    }
                    else {
                        return res.status(401).send('Unauthorized.')
                    }
                })
            })
            .catch((err) => {
                return res.status(401).send(err); // unauthorized
            })
    }
}


export {authorize as authenticate, getToken as getAccessToken}