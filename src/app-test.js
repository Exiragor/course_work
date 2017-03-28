import mysql from 'mysql';
import config from './config';
import express from 'express';
import * as path from 'path';
import temp from 'consolidate';

let app = express();

app.engine('hbs', temp.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('/public', express.static(path.join( __dirname + '/public')));

app.get('/', function(req, res) {
    res.render('index');
});

let db  = mysql.createConnection(config.dbConfig);

db.connect(function(err) {
    if (err){
        console.log('error in connection:' + err.stack);
    }
    return;
});

let query = 'SELECT * FROM test';

db.query(query, (err, results, fields) =>{
    console.log('res: ' + JSON.stringify(results));
    console.log('fields' + JSON.stringify(fields));
});

db.end();

export default app;