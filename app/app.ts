import * as express from 'express';
import * as path from 'path';
import * as temp from 'consolidate';
import { router } from './routes';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'cookie-session';
import { pass as passport } from './controllers/Passport'

let app = express();


app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({  extended: true })); 
app.use(cookieParser());
app.use(session({keys: ['secret']}));

app.engine('jade', temp.jade);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname +'/../views'));

passport.init(app);
passport.startAuth();


//routes

app.use('/public', express.static(path.join(__dirname +'/../public')));

app.use('/admin', router.getAdminRoutes());
app.use('/dev', router.getDevRoutes());
app.use('/auth', router.getAuthRoutes());
app.use('/profile', router.getProfileRoutes());

app.get('*', (req, res) => {
    res.render('index', {mess: 'Hello', text: 'Добро пожаловать!'});
});


export default app;