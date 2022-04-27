/** source/controllers/clients.ts */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';

const accessExpireTime = 1800; // 30 min
const refreshExpireTime = 604800; // 7 days

// get all clients
const dummyUsers = [
    {
        'id': '1',
        'email': 'example',
        'pass': 'nohash',
        'role': 'admin'
    },
    {
        'id': '2',
        'email': 'user',
        'pass': 'pass',
        'role': 'normal'
    },
    {
        'id': '3',
        'email': 'employee',
        'pass': 'whereismyraise',
        'role': 'employee'
    },
    {
        'id': '4',
        'email': 'employeeManager',
        'pass': 'noraiseforyou',
        'role': 'employeeManager'
    }
]

// dummy, store in db later
let refreshTokens: RefreshTokenData[] = [];

async function login(req: Request, res: Response, next: NextFunction) {
    if (process.env.JWTSECRET == undefined) {
        throw new Error('JWTSECRET undefined');
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = dummyUsers.find(u => {
        return u.email == email && u.pass == password;
    })

    if (user) {
        const tokenData = {'id': user.id, 'role': user.role}
        const accessToken = createAccessToken(tokenData);
        const refreshToken = createRefreshToken(user.id);

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
    
    const token = req.body.refreshToken;

    if (!token)
        return res.status(401).send('Refresh token required.'); // unauthorized
    
    let rt = refreshTokens.find((r) => r.token == token); 

    if (rt === undefined)
        return res.status(403).send('Invalid refresh token'); // forbidden
    if (rt.expiryDate < (new Date()).getTime()) {
        refreshTokens = refreshTokens.filter((t) => t !== rt);
        return res.status(403).send('Refresh token expired'); // forbidden
    }
    // 403 => Front-end needs to ask for login again

    const user = dummyUsers.find((u) => u.id == rt?.userid);
    if (user === undefined) {
        return res.sendStatus((500));
    }

    const accessToken = createAccessToken({id: user.id, role: user.role})

    res.json({accessToken});
};

async function logout(req: Request, res: Response, next: NextFunction) {
    const rt = req.body.refreshToken;
    refreshTokens = refreshTokens.filter(t => t !== rt);
    res.sendStatus(200);
};

const createAccessToken = (tokenData: AccessTokenData) => {
    if (process.env.JWTSECRET == undefined) {
        throw new Error('JWTSECRET undefined');
    }
    return jwt.sign(tokenData, process.env.JWTSECRET, {expiresIn: accessExpireTime});
}

const createRefreshToken = (userid: string) => {
    let expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + refreshExpireTime);
    const refreshToken: RefreshTokenData = {
        token: uuid(),
        userid: userid,
        expiryDate: expirationDate.getTime(),
    }

    // store in db
    refreshTokens.push(refreshToken);

    return refreshToken.token;
}

interface AccessTokenData {
    id: string,
    role: string
}

interface RefreshTokenData {
    token: string,
    userid: string,
    expiryDate: number,
}

export default {login, logout, refreshToken};
