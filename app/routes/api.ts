import * as express from 'express';
let router = express.Router();
import controller from '../controllers';


router.get('/kappa', controller.trainers.getTrainers);

router.post('/addtrainer', controller.trainers.addTrainer);

export default router;