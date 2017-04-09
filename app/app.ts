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
		function(username, password, done) {
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

let auth = passport.authenticate(
	'local',{
		successRedirect: '/admin/visitors/view',
		failureRedirect: '/login'
	});

var mustBeAuthenticated = function(req, res, next) {
	// body...
	req.isAuthenticated() ? next() : res.redirect('/');
};

app.use('/public', express.static(path.join(__dirname +'/../public')));

app.use('/admin', router.getAdminRoutes());
app.use('/dev', router.getDevRoutes());
app.get('/login', (req, res) => {
    res.render('auth/login');
});
app.get('/', auth);
app.post('/login', auth);
app.all('/admin', mustBeAuthenticated);
// app.all('/admin/*', mustBeAuthenticated);
app.get('*', (req, res) => {
    res.render('index', {mess: 'Hello', text: 'Добро пожаловать!'});
});


export default app;