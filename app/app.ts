import * as express from 'express';
import * as path from 'path';
import * as temp from 'consolidate';
import { router } from './routes';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'cookie-session';
import * as passport from 'passport';
import * as localpass from 'passport-local';


let app = express();
let localStrategy = localpass.Strategy;

app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({  extended: true })); 
app.use(cookieParser());
app.use(session({keys: ['secret']}));

app.use(passport.initialize());
app.use(passport.session());

app.engine('jade', temp.jade);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname +'/../views'));

passport.use(
	new localStrategy(
		(username, password, done) => {
			if (username != 'admin')
				return done(null, false, {message: 'Неправильный логин'});

			if (password != 'admin')
				return done(null, false, {message: 'Неправильный пароль'});

			return done(null, {username: 'admin'});
		}
	)
);
passport.serializeUser(function(user, done) {
	done(null, user.username);
});

passport.deserializeUser(function(id, done) {
	done(null, {username: id});
});

//routes

app.use('/public', express.static(path.join(__dirname +'/../public')));

app.use('/admin', router.getAdminRoutes());
app.use('/dev', router.getDevRoutes());
app.use('/auth', router.getAuthRoutes());

app.get('*', (req, res) => {
    res.render('index', {mess: 'Hello', text: 'Добро пожаловать!'});
});


export default app;