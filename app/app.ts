import * as express from 'express';
import * as path from 'path';
import * as temp from 'consolidate';
import apiRoutes from './routes/api';
import * as bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.engine('hbs', temp.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname +'/../views'));

app.use('/public', express.static(path.join(__dirname +'/../public')));

app.use('/admin', apiRoutes);

app.get('*', (req, res) => {
    res.render('index');
});


export default app;