import * as express from 'express';
import controller from '../controllers';
import * as passport from 'passport';

interface IRouter {
    admin: () => {},
    dev: () => {},
    auth: () => {},
    profile: () => {}
}

export class Routes {

    private router: IRouter;

    constructor() {
        let admin, dev, auth, profile;
        this.router = { admin, dev, auth, profile }
        for (let route in this.router) {
            this.router[route] = express.Router();
        }

        this.setAdminRoutes();
        this.setDevRoutes();
        this.setAuthRoutes();
        this.setProfileRoutes();
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

    private usersRoutes(router: any) {
        router.get('/users/view/', (req, res) => {
            controller.users.getAllVisitors(res);
        });
        router.get('/users/add_new/', (req, res) => {
            controller.users.formAddNew(res);
        });
        router.post('/users/add_new/', (req, res) => {
            controller.users.addNewVisitor(req.body, res);
        });
        router.get('/user/:id/edit', (req, res) => {
            controller.users.editVisitorPage(req, res);
        });
        router.post('/user/:id/edit', (req, res) => {
            controller.users.editVisitor(req.body, req.params.id, res);
        });
        router.get('/user/:id/delete', (req, res) => {
            controller.users.deleteUser(req.params.id, res);
        })

        return router;
    }

    private generatorRoutes(router): () => {} {
        router.get('/generate/trainers', (req, res) => {
            controller.generator.generateTrainers();
            res.send('Идет заполнение');
        });
        router.get('/generate/users', (req, res) => {
            controller.generator.generateVisitors();
            res.send('Идет заполнение');
        });

        return router;
    }

    private authRoutes(router) {
        let auth = passport.authenticate(
                'local',
                {
                    successRedirect: '/profile',
                    failureRedirect: '/auth/login',
                    failureFlash: true
                }
        );

        router.get('/login', (req, res) => {
            res.render('auth/login', {mess: req.flash('errLogin')});
        });
        router.post('/login', auth);
        router.get("/logout", (req, res) => {
            req.logout();
            res.redirect('/auth/login');
        });
        router.get('/registration', (req, res) => {
            res.render('auth/registration');
        });
        router.post('/registration', (req, res) => {
            controller.users.registrationUser(req.body, res);
        });


        return router;
    }

    private profileRoutes(router) {
        router.get('/', (req, res) => {
            controller.users.getUserProfile(req.user, res);
        });

        return router;
    }

    private mustBeAuthenticated(router) {
        router.all('/*', (req, res, next) => {
            req.isAuthenticated() ? next() : res.redirect('/auth/login');
        });

        return router;
    }

    private mustBeAdminRole(router) {
        router.all('/*', (req, res, next) => {
            controller.users.checkAdminRole(req.user, res, next);
        });

        return router;
    }

    private setAdminRoutes(): void {
        this.router.admin = this.mustBeAuthenticated(this.router.admin);
        this.router.admin = this.mustBeAdminRole(this.router.admin);
        this.router.admin = this.trainerRoutes(this.router.admin);
        this.router.admin = this.usersRoutes(this.router.admin);
    }

    private setAuthRoutes(): void {
        this.router.auth =  this.authRoutes(this.router.auth);
    }

    private setDevRoutes(): void {
        this.router.dev = this.generatorRoutes(this.router.dev);
    }

    private setProfileRoutes() {
        this.router.profile = this.mustBeAuthenticated(this.router.profile);
        this.router.profile = this.profileRoutes(this.router.profile);
    }


    public getAdminRoutes(): () => {} {
        return this.router.admin;
    }

    public getDevRoutes(): () => {} {
        return this.router.dev;
    }

    public getAuthRoutes(): () => {} {
        return this.router.auth;
    }

    public getProfileRoutes(): () =>{} {
        return this.router.profile;
    }

}

export let router: Routes = new Routes;