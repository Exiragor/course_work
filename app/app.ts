import * as express from 'express';
import * as path from 'path';
import * as temp from 'consolidate';
import { router } from './routes';
import * as bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.engine('jade', temp.jade);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname +'/../views'));

app.use('/public', express.static(path.join(__dirname +'/../public')));

app.use('/admin', router.getAdminRoutes());
// app.use('/dev', router.getDevRoutes());

app.get('*', (req, res) => {
    res.render('index', {mess: 'Hello', text: 'Добро пожаловать!'});
});


export default app;