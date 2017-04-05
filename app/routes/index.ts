import * as express from 'express';
import controller from '../controllers';

interface IRouter {
    admin: any,
    dev: any
}

export class Routes{
    router: IRouter;

    constructor() {
        let admin, dev;
        this.router = {
            admin,
            dev
        };
        for (let rout in this.router){
            this.router[rout] = express.Router();
        }
    }

    public getAdminRoutes() {
        this.router.admin.get('/trainers', (req, res) => {
            controller.trainers.getTrainers(res);
        });

        this.router.admin.post('/trainers/add', (req, res) => {
            controller.trainers.addTrainer(req.body, res);
        });

        this.router.admin.post('/trainers/:id/edit', (req, res) => {
            controller.trainers.editTrainer(req.params.id, req.body, res);
        });

        return this.router.admin;
    }

    public getDevRoutes() {
        this.router.dev.get('/generate/trainers', (req, res) => {
            controller.generator.generateTrainers();
            res.send('Идет заполнение');
        });

        this.router.dev.get('/generate/visitors', (req, res) => {
            controller.generator.generateVisitors();
            res.send('Идет заполнение');
        });

        return this.router.dev;
    }

}

export let router = new Routes;