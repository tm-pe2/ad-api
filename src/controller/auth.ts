/** source/controllers/clients.ts */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// get all clients

const dummyUsers = [
    {
        'email': 'example',
        'pass': 'nohash'
    },
    {
        'email': 'oxoomple',
        'pass': 'hash?'
    }
]

async function login(req: Request, res: Response, next: NextFunction) {
    // Add this as a check in start up
    if (process.env.JWTSECRET == undefined)
    return;


    const { email, password } = req.body;

    const user = dummyUsers.find(u => {
        return u.email == email && u.pass == password;
    })

    if (user) {
        // add role, maybe id instead etc
        const accessToken = jwt.sign({'email': email}, process.env.JWTSECRET)

        res.json({accessToken});
    }
    else {
        res.status(401);
        res.send('Incorrect login attempt');
    }
};

export default {login};
