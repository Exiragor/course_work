import * as express from 'express';
import controller from '../controllers';

interface IRouter {
    admin: any,
    dev: any
}

export class Routes {
    private router: IRouter;

    constructor() {
        let admin, dev;
        this.router = { admin, dev }
        for (let route in this.router) {
            this.router[route] = express.Router();
        }

        this.setAdminRoutes();
        this.setDevRoutes();
    }
    
    private setAdminRoutes(): void {
        this.router.admin = this.trainerRoutes(this.router.admin);
    }

    private trainerRoutes(router): any {
        router.get('/trainers', (req, res) => {
            controller.trainers.getTrainers(res);
        });
        router.post('/trainers/add', (req, res) => {
            controller.trainers.addTrainer(req.body, res);
        });
        router.post('/trainers/:id/edit', (req, res) => {
            controller.trainers.editTrainer(req.params.id, req.body, res);
        });

        return router;
    }

    private setDevRoutes(): void {
        this.router.dev = this.generatorRoutes(this.router.dev);
    }

    private generatorRoutes(router): any {
        router.get('/generate/trainers', (req, res) => {
            controller.generator.generateTrainers();
            res.send('Идет заполнение');
        });

        router.get('/generate/visitors', (req, res) => {
            controller.generator.generateVisitors();
            res.send('Идет заполнение');
        });

        return router;
    }

    public getAdminRoutes(): any {
        return this.router.admin;
    }

    public getDevRoutes(): any {
        return this.router.dev;
    }

}

export let router = new Routes;