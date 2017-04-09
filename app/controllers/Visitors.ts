import Controller from './Controller';

interface IDataAddNew {
    name: string,
    age: string,
    address: string,
    phone: string,
    sport_category: string
}

export class Visitors extends Controller{
    
    private tableName: string = 'visitor';
    private arField: object = {
        name: '',
        age: '',
        address: '',
        phone: '',
        sport: ''
    };

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
        if (result) {
            return res.render( 
                'visitors/add_new', 
                { status: 'err', err: 'Все поля должны быть заполнены', field: { name: data.name, age: data.age, address: data.address, phone: data.phone, sport: data.sport_category}}
            );
        }
        let arProps = [{
            visitorName: data.name,
            visitorAge: data.age,
            visitorAddress: data.address,
            visitorPhone: data.phone,
            sportCategory: data.sport_category
        }];

        try {
            await this.db.addRow(this.tableName, arProps);
            res.render('visitors/add_new', { status: 'okay', mess: 'Посетитель успешно добавлен', field: this.arField});
        }
        catch(err) {
            console.log(err);
            if(err.errno === 1062) res.render('visitors/add_new', { status: 'err', err: 'Этот телефон уже указан для другого пользователя, телефон должен быть уникальным!',
                field: { name: data.name, age: data.age, address: data.address, phone: data.phone, sport: data.sport_category} 
            });
        }
    } 

    private mdwCheckData(data: IDataAddNew) {
        for (let item in data) {
            if(data[item] === ''){
                return true;
            }
        }
        return false;
    }

    public formAddNew(res) {
        res.render('visitors/add_new', { field: this.arField});
    }

    public async editVisitorPage(req, res) {
        let position = {
            field: 'VisitorID',
            value: req.params.id
        };
        try {
            let result = await this.db.getRow(this.tableName, position);
            res.render('visitors/edit', { fields: result[0]});
        }
        catch(err) {
            console.log(err);
        }
    }

    public async editVisitor(data: IDataAddNew, id:string, res) {
        if(this.mdwCheckData(data)) return res.render(
            'visitors/edit',
            {   
                status: 'err', 
                err: 'Поля не могут оставаться пустыми', 
                fields: {visitorName: data.name, visitorAge: data.age, visitorAddress: data.address, visitorPhone: data.phone, sportCategory: data.sport_category}
            }
        );

        let position = {
            field: 'VisitorID',
            mark: null,
            value: id
        };
        let arProps = {
            visitorName: data.name,
            visitorAge: data.age,
            visitorAddress: data.address,
            visitorPhone: data.phone,
            sportCategory: data.sport_category
        }
        try {
            await this.db.updateRow(this.tableName, position, arProps);
            res.render(
                'visitors/edit', 
                { 
                    status: 'update', 
                    mess: 'Успешно изменен', 
                    fields: {visitorName: data.name, visitorAge: data.age, visitorAddress: data.address, visitorPhone: data.phone, sportCategory: data.sport_category}
                }
            );
        }
        catch(err) {
            console.log(err);
            if(err.errno === 1062) res.render('visitors/edit', { status: 'err', err: 'Этот телефон уже указан для другого пользователя, телефон должен быть уникальным!',
                fields: {visitorName: data.name, visitorAge: data.age, visitorAddress: data.address, visitorPhone: data.phone, sportCategory: data.sport_category}
            });
        } 
    } 

}

export let visitors: Visitors = new Visitors;