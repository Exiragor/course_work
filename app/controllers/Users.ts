import Controller from './Controller';

interface IDataAddNew {
    name: string,
    age: string,
    address: string,
    phone: string,
    role: string
}

interface IDataRegistration {
    phone: string,
    username: string,
    password: string
}

interface IDataEditProfile {
    name: string,
    age: string,
    address: string,
    phone: string
}

export class Users extends Controller {
    
    private tableName: string = 'users';
    private arField: Object = {
        name: '',
        age: '',
        address: '',
        phone: '',
        role: ''
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
                { status: 'err', err: 'Все поля должны быть заполнены', field: { name: data.name, age: data.age, address: data.address, phone: data.phone, role: data.role}}
            );
        }
        let arProps = [{
            Name: data.name,
            Age: data.age,
            Address: data.address,
            Phone: data.phone,
            Role: data.role
        }];

        try {
            await this.db.addRow(this.tableName, arProps);
            res.render('visitors/add_new', { status: 'okay', mess: 'Посетитель успешно добавлен', field: this.arField});
        }
        catch(err) {
            console.log(err);
            if(err.errno === 1062) res.render('visitors/add_new', { status: 'err', err: 'Этот телефон уже указан для другого пользователя, телефон должен быть уникальным!',
                field: { name: data.name, age: data.age, address: data.address, phone: data.phone, role: data.role} 
            });
        }
    } 

    private mdwCheckData(data: any) {
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
            field: 'UserID',
            mark: null,
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
                fields: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: data.role} 
            }
        );

        let position = {
            field: 'UserID',
            mark: null,
            value: id
        };
        let arProps = {
            Name: data.name,
            Age: data.age,
            Address: data.address,
            Phone: data.phone,
            Role: data.role
        }
        try {
            await this.db.updateRow(this.tableName, position, arProps);
            res.render(
                'visitors/edit', 
                { 
                    status: 'update', 
                    mess: 'Успешно изменен', 
                    fields: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: data.role}
                }
            );
        }
        catch(err) {
            console.log(err);
            if(err.errno === 1062) res.render('visitors/edit', { status: 'err', err: 'Этот телефон уже указан для другого пользователя, телефон должен быть уникальным!',
                fields: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: data.role}
            });
        } 
    } 

    public async deleteUser(id: string, res) {
        let position = {
                field: 'UserID',
                mark: null,
                value: id
            };
        try
        {
            await this.db.deleteRow(this.tableName, position);
            res.redirect('/admin/users/view');
        }
        catch (err)
        {
            console.log(err);
        }

    }

    public async registrationUser(data: IDataRegistration, res)
    {
        if(this.mdwCheckData(data))
            return res.render('auth/registration', {status: 'err', mess: 'Все поля должны быть заполнены'});

        let position = {
            field: 'phone',
            mark: null,
            value: data.phone
        };
        let arProps = {
            login: data.username,
            password: data.password
        }
        
        try
        {
            let result = await this.db.getRow(this.tableName, position);
            if(result.length === 0)
                return res.render(
                    'auth/registration', 
                    { 
                        status: 'err', 
                        mess: 'Данного телефона нет в базе данных Спорткомплекса, обратитесь к администратору для решения этого вопроса.' 
                    }
                );
            if(result[0].login != null)
                return res.render(
                    'auth/registration', 
                    { 
                        status: 'err', 
                        mess: 'Вы уже зарегистрированы, если не помните логин и пароль, обратитесь к администратору.' 
                    }
                );


            await this.db.updateRow(this.tableName, position, arProps);
            res.render(
                'auth/registration', 
                { 
                    status: 'success', 
                    mess: 'Успешная регистрация' 
                }
            );
        }
        catch (err)
        {
            console.log(err);
            if(err.errno === 1062) res.render('auth/registration', { status: 'err', mess: 'Данный логин занят' });
        } 

    }

    public async getUserProfile(user, res) {
        let position = {
            field: 'login',
            mark: null,
            value: user.username
        }
        try
        {
            let result = await this.db.getRow(this.tableName, position);
            //let sections = await this.db.getRelativeTable();
        }
        catch (err)
        {
            console.log(err);
        }
        return res.render('profile/index', { field: result[0], user: user.username});
    }

    public async checkAdminRole(user, res, next) {
        let position = {
            field: 'login',
            mark: null,
            value: user.username
        }
        try {
           let result = await this.db.getRow(this.tableName, position);
           let role = result[0].Role;
           if(role == 'Админ')
               return next();
           return res.render('profile/failAdmin', { user: user.username});
        }
        catch(err) {
            console.log(err);
        }
    }

    public async editUserProfilePage(user, res) {
        let position = {
            field: 'login',
            mark: null,
            value: user.username
        }
        let result = await this.db.getRow(this.tableName, position);
        return res.render('profile/edit', { field: result[0], user: user.username});
    }

    public async editUserProfile(data:IDataEditProfile, user, res) {
        if (this.mdwCheckData(data))
            res.render('profile/edit', { status: 'err', mess: 'Поля не должны оставаться пустыми', user: user.username});
        if (+(data.age) <= 0)
            res.render('profile/edit', { status: 'err', mess: 'Возраст должен быть больше нуля', user: user.username});
        

    }

}

export let users: Users = new Users;