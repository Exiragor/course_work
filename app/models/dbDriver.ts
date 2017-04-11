import * as knex from 'knex';

interface Position {
    field: String,
    mark: String | null,
    value: String
}

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

    public getRow(table: string, pos: any): Promise<any>{
        return new Promise((resolve, reject) => {
            this.db(table).select().where(pos.field, pos.value)
                .then((res => {
                    resolve(res);
                }))
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

    public updateRow(name: String, pos: Position, Props: object):Promise<any> {
        return new Promise((resolve, reject) => {
            let whereProps: String[];

            if(pos.mark === null)
                whereProps = [pos.field, pos.value];
            else
                whereProps = [pos.field, pos.mark, pos.value];

            this.db(name)
                .where(...whereProps)
                .update(Props)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    public deleteRow(name: string, pos: Position): Promise<any> {
        return new Promise((resolve, reject) => {
            let whereProps: String[];

            if(pos.mark === null)
                whereProps = [pos.field, pos.value];
            else
                whereProps = [pos.field, pos.mark, pos.value];

            this.db(name)
                .where(...whereProps)
                .del()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

}

export default Tasks;