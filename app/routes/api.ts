import * as express from 'express';
let router = express.Router();
import controller from '../controllers';

router.get('/trainers', (req, res) => {
    controller.trainers.getTrainers(res);
});

router.post('/trainers/add', (req, res) => {
     controller.trainers.addTrainer(req.body, res);
});

router.post('/trainers/:id/edit', (req, res) => {
    controller.trainers.editTrainer(req.body, res);
});

export default router;