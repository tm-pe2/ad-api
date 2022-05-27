import { UserRole } from "../models/user";
import jwt from 'jsonwebtoken';

export interface AccessTokenData {
    id: number,
    role_id: UserRole
}

const accessExpireTime = 1800; // 30 min

export class AccessToken {
    static create(tokenData: AccessTokenData) {
        if (process.env.JWTSECRET == undefined) {
            throw new Error('JWTSECRET undefined');
        }
        return jwt.sign(tokenData, process.env.JWTSECRET,
            {expiresIn: accessExpireTime}
        );
    }
}
