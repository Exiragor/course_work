import express from 'express';
import * as path from 'path';
import {match, RouterContext} from 'react-router';
import render from './server-render';
import temp from 'consolidate';

let app = express();

app.engine('hbs', temp.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('/public', express.static(path.join( __dirname + '/public')));

app.get('*', render.handleRender);


export default app;