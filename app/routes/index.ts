import * as express from 'express';
import controller from '../controllers';

interface IRouter {
    admin: () => {},
    dev: () => {}
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
    

    private trainerRoutes(router): () => {} {
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

    private visitorsRoutes(router: any) {
        router.get('/visitors/view/', (req, res) => {
            controller.visitors.getAllVisitors(res);
        });
        router.get('/visitors/add_new/', (req, res) => {
            controller.visitors.formAddNew(res);
        });
        router.post('/visitors/add_new/', (req, res) => {
            controller.visitors.addNewVisitor(req.body, res);
        });
        router.get('/visitor/:id/edit', (req, res) => {
            controller.visitors.editVisitorPage(req, res);
        });
        router.post('/visitor/:id/edit', (req, res) => {
            controller.visitors.editVisitor(req.body, req.params.id, res);
        });

        return router;
    }

    private generatorRoutes(router): () => {} {
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

    private setAdminRoutes(): void {
        this.router.admin = this.trainerRoutes(this.router.admin);
        this.router.admin = this.visitorsRoutes(this.router.admin);
    }

    private setDevRoutes(): void {
        this.router.dev = this.generatorRoutes(this.router.dev);
    }


    public getAdminRoutes(): () => {} {
        return this.router.admin;
    }

    public getDevRoutes(): () => {} {
        return this.router.dev;
    }

}

export let router: Routes = new Routes;