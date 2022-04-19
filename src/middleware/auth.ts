import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

// TODO change to custom user role type, allow for self check (eg: get own user info with /user/self)
function authorize(role: string): (req: Request, res: Response, next: NextFunction) => Promise<void> {
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

                    if (decoded.role != undefined && decoded.id != undefined
                        && decoded.role == role) {
                        // TODO: check if okay practise
                        // Pass decoded info into request body for later use in controllers
                        req.body.userId = decoded.id
                        req.body.userRole = decoded.role
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

function getToken(req: Request): Promise<string> {
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

export {authorize as authenticate}
