import * as passport from 'passport';
import * as localpass from 'passport-local';
import Controller from './Controller';


export class Passport extends Controller {

	localStrategy: () => {};
	passport: any;
	
	constructor(argument) {
		super();
		this.localStrategy = localpass.Strategy;
	}



}

// passport.use(
// 	new localStrategy(
// 		(username, password, done) => {
// 			if (username != 'admin')
// 				return done(null, false, {message: 'Неправильный логин'});

// 			if (password != 'admin')
// 				return done(null, false, {message: 'Неправильный пароль'});

// 			return done(null, {username: 'admin'});
// 		}
// 	)
// );
// passport.serializeUser(function(user, done) {
// 	done(null, user.username);
// });

// passport.deserializeUser(function(id, done) {
// 	done(null, {username: id});
// });