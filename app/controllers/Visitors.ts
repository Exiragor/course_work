import Controller from './Controller';

interface IDataAddNew {
    name: string,
    age: string,
    address: string,
    phone: string,
    sport_categoty: string
}

export class Visitors extends Controller{
    
    private tableName: string = 'visitor';

    public async getAllVisitors(res: any) {
        try {
            let result = await this.db.getTable(this.tableName);
            return res.render('visitors/index', { allVisitors: result });
        }
        catch(err) {
            console.log(err);
        }
    }  

    public async addNewVisitor(data: IDataAddNew ,res: any) {
        let result = this.mdwCheckData(data);
        try {
            res.render('visitors/add_new', { mess: result});
        }
        catch(err) {
            console.log(err);
        }
    } 

    private mdwCheckData(data: IDataAddNew) {
        for (let item in data) {
            if(data[item] == ''){
                return 'Error';
            }
        }
        return 'Okay';
    }

}

export let visitors: Visitors = new Visitors;