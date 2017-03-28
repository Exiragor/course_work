import mysql from 'mysql';


class Tasks {

    constructor(dbConf) {
        this.db = mysql.createConnection(dbConf);
        this.db.connect(function(err) {
            if (err){
                console.log('error in connection:' + err.stack);
            }
            return;
        });    
    }

    getTable(name) {
        return new Promise((resolve, reject) => {
            this.db.query(`SELECT * FROM ${name};`, function(error, res) {
                resolve(res);
                console.log('query error: ' + error); 
                reject(error); 
            });
        });
    }

}

export default Tasks;