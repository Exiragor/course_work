import * as passport from 'passport';
import * as localpass from 'passport-local';
import Controller from './Controller';
import * as flash from 'connect-flash';


export class Passport extends Controller {

	private localStrategy: any;
	private passport: any;
	private flash: any;
	private tableName: string;
	
	constructor() {
		super();
		this.localStrategy = localpass.Strategy;
		this.passport = passport;
		this.flash = flash;
		this.tableName = 'users';
	}

	private enableLocalStrategy() {
		this.passport.use(
			new this.localStrategy(
				{
					passReqToCallback : true
				},
				async (req, username, password, done) => {
					let position = {
						field: 'login',
						mark: null,
						value: username
					}
					let result = await this.db.getRow(this.tableName, position);
					if(result.length == 0)
						return done(null, false, req.flash('errLogin', 'Пользователя с таким логином не существует!'));
					if(result[0].password !== password)
						return done(null, false, req.flash('errLogin', 'Неправильный пароль'));


					return done(null, {username: username});
				}
			)
		);
		this.passport.serializeUser(function(user, done) {
			done(null, user.username);
		});

		this.passport.deserializeUser(function(id, done) {
			done(null, {username: id});
		});
	}

	public init(app: any) {
		app.use(this.passport.initialize());
		app.use(this.passport.session());
		app.use(this.flash());
	}

	public startAuth() {
		this.enableLocalStrategy();
	}

}

export let pass: Passport = new Passport;

