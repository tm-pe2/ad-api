import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user-service';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { RefreshToken, RefreshTokenData } from '../classes/refreshtokens';

const accessExpireTime = 1800; // 30 min
const refreshExpireTime = 604800; // 7 days

// get all clients
// const dummyUsers = [
//     {
//         'id': '1',
//         'email': 'example',
//         'pass': 'nohash',
//         'role': 'admin'
//     },
//     {
//         'id': '2',
//         'email': 'user',
//         'pass': 'pass',
//         'role': 'normal'
//     }
// ]

async function login(req: Request, res: Response, next: NextFunction) {
    if (process.env.JWTSECRET == undefined) {
        throw new Error('JWTSECRET undefined');
    }

    const email = req.body.email;   //validation ?
    const password = req.body.password;     //validation

    // const user = dummyUsers.find(u => {
    //     return u.email == email && u.pass == password;
    // })

    const user = await userService.getUserByEmail(email);
    bcrypt

    if (user) {
        const tokenData = {'id': user.UserID, 'role': user.RoleID.toString()}
        const accessToken = createAccessToken(tokenData);
        const refreshToken = createRefreshToken(user.UserID);

        res.json({accessToken, refreshToken});
    }
    else {
        res.status(401);
        res.send('Incorrect login attempt.');
    }
};

async function refreshToken(req: Request, res: Response, next: NextFunction) {
    if (process.env.JWTSECRET == undefined) {
        throw new Error('JWTSECRET undefined');
    }
    
    const token = req.body.refreshToken;    // validation ?

    if (!token)
        return res.status(401).send('Refresh token required.'); // unauthorized
    
    RefreshToken.getRefreshToken(token)
        .then((rt) => {
            if (rt.expires.getTime() < (new Date()).getTime()) {
                return res.status(403).send('Refresh token expired'); // forbidden
            }
            
            // Valid refresh token -> refresh token
            userService.getUserById(rt.userId)
            .then((user) => {
                const accessToken = createAccessToken({id: user.UserID, role: user.RoleID.toString()})
                res.json({accessToken});
            })
            .catch((err) => {
                return res.sendStatus((500));
            });
        })
        .catch((err) => {
            // not found
            return res.status(403).send('Refresh token invalid'); // forbidden
        });
};

// TODO: update front-end to use user id
async function logout(req: Request, res: Response, next: NextFunction) {
    const id = req.body.user_id;
    RefreshToken.deleteRefreshToken(id) // Logs out everywhere, all refresh tokens become invalid
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(400);
        })
};

const createAccessToken = (tokenData: AccessTokenData) => {
    if (process.env.JWTSECRET == undefined) {
        throw new Error('JWTSECRET undefined');
    }
    return jwt.sign(tokenData, process.env.JWTSECRET, {expiresIn: accessExpireTime});
}

const createRefreshToken = (userid: number) => {
    let expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + refreshExpireTime);
    
    // store in db
    const token = uuid();
    RefreshToken.addRefreshToken(userid, token)

    return token;
}

interface AccessTokenData {
    id: number,
    role: string
}

// interface RefreshTokenData {
//     token: string,
//     userid: string,
//     expiryDate: number,
// }

export default {login, logout, refreshToken};
