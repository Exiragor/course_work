import Controller from './Controller';

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

}

export let visitors: Visitors = new Visitors;