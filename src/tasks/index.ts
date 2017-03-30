import * as mysql from 'mysql';
import config from '../config';
import * as knex from 'knex';


class Tasks {
    db: any;

    constructor(dbConf: object) {
        this.db = knex({
            client: 'mysql',
            connection: config.dbConfig
        });
        // this.db = mysql.createConnection(dbConf);
        // this.db.connect(function(err) {
        //     if (err){
        //         console.log('error in connection:' + err.stack);
        //     }
        //     return;
        // });    
    }

    getTable(name: String):Promise<any> {
        return new Promise((resolve, reject) => {
            // this.db.query(`SELECT * FROM ${name};`, function(error, res) {
            // resolve(res);
            // reject(error);
            // console.log('query error: ' + error);
           
        // });
         let result = this.db.select().table(name);
            resolve(result);
    });

    }

}

export default Tasks;