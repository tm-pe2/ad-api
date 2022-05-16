/** source/routes/clients.ts */
import express from 'express';
const router = express.Router();

import * as auth from "../middleware/auth"
import { UserRole } from '../models/userrole';

/**Example route to protect a resource.
 * Use this route to test the authentication middleware.
 * 
 * authenticate is a middleware function that will be called before any other route.
 * It will check if the user is authenticated and if they have a role included in the provided roles array.
 */
router.get('/protected', auth.authenticate([UserRole.ADMIN, UserRole.MANAGER]), async (req, res, next) => {
    res.send({data:'protected'});
})

export = router
