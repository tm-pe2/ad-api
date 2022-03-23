/** source/routes/clients.ts */
import express from 'express';
const router = express.Router();


import * as auth from "../middleware/auth"

router.get('/test', auth.authenticate('admin'), async (req, res, next) => {
    res.send('protected');
})

export = router
