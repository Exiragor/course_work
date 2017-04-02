import * as express from 'express';
let router = express.Router();
import controller from '../controllers';


// router.get('/test', controller.trainers.getTrainers);

router.get('/kappa', (req, res) => {
    controller.trainers.getTrainers(res);
});

export default router;