import * as mysql from 'mysql';
import * as knex from 'knex';


 class Tasks {
    private db: any;

    constructor(dbConf: object) {
        this.db = knex({
            client: 'mysql',
            connection: dbConf
        });   
    }

    public getTable(name: String):Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.select().table(name)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                });
        });

    }

    public addRow(name: String, arProps: object[]):Promise<any> {
        return new Promise((resolve, reject) => {
            this.db(name).insert(arProps)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                });
        });
    }

}

export default Tasks;