import express from 'express';
import * as cityController from '../controllers/city-controller';


const router = express.Router();

router.get('/', cityController.getAllCities);


export = router;
