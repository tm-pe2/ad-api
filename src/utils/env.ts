const mandatoryKeys = [
    'JWTSECRET',
]

export class Env {
    static validateMandatoryKeys(): void {
        for (const key of mandatoryKeys) {
            if (!process.env[key])
                throw new Error(key + ' is undefined in env');
        }
    }
    
}
