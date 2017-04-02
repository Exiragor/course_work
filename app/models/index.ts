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
            resolve(this.db.select().table(name));
        });

    }

}

export default Tasks;