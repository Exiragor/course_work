import express from 'express';
import * as path from 'path';
import temp from 'consolidate';
import apiRoutes from './routes/api';

let app = express();

app.engine('hbs', temp.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('/public', express.static(path.join( __dirname + '/public')));

app.use('/api', apiRoutes);
app.get('*', (req, res) => {
    res.render('index');
});





export default app;