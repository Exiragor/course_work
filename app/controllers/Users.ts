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

    public async getAllVisitors(user, res: any) {
        try {
            let result = await this.db.getTable(this.tableName);
            return res.render('visitors/index', { allVisitors: result, user: user.username });
        }
        catch(err) {
            console.log(err);
        }
    }
    public async getAllVisitorsFilter(user, data, res: any) {
        try {
            let filter = [];
            let result = await this.db.getTable(this.tableName);
            for (let item of result)
            {   
                if(data.name != '')
                {
                    if(item.Name.indexOf(data.name) == -1)
                        continue;
                }
                if(data.age_from != '')
                {
                    if(+(item.Age) < +(data.age_from))
                        continue;
                }
                if(data.age != '')
                {
                    if(+(item.Age) > +(data.age))
                        continue;
                }
                if(data.city != '')
                {
                    if(item.Address.indexOf(data.city) == -1)
                        continue;
                }
                filter.push(item);
            }
            return res.render('visitors/index', { allVisitors: filter, user: user.username });
        }
        catch(err) {
            console.log(err);
        }
    }  


    public async addNewVisitor(user, data: IDataAddNew ,res: any) {
        let result = this.mdwCheckData(data);
        if (result) {
            return res.render( 
                'visitors/add_new', 
                { status: 'err', err: 'Все поля должны быть заполнены', field: { name: data.name, age: data.age, address: data.address, phone: data.phone, role: data.role, user: user.username}}
            );
        }
        if (+(data.age) <= 0) {
            return res.render( 
                'visitors/add_new', 
                { status: 'err', err: 'Возраст должен быть больше нуля', field: { name: data.name, age: data.age, address: data.address, phone: data.phone, role: data.role, user: user.username}}
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
            res.render('visitors/add_new', { status: 'okay', mess: 'Посетитель успешно добавлен', field: this.arField, user: user.username});
        }
        catch(err) {
            console.log(err);
            if(err.errno === 1062) res.render('visitors/add_new', { status: 'err', err: 'Этот телефон уже указан для другого пользователя, телефон должен быть уникальным!',
                field: { name: data.name, age: data.age, address: data.address, phone: data.phone, role: data.role}, user: user.username 
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

    public formAddNew(user, res) {
        res.render('visitors/add_new', { field: this.arField, user: user.username});
    }

    public async editVisitorPage(req, res) {
        let position = {
            field: 'UserID',
            mark: null,
            value: req.params.id
        };
        try {
            let result = await this.db.getRow(this.tableName, position);
            res.render('visitors/edit', { fields: result[0], user: req.user.username});
        }
        catch(err) {
            console.log(err);
        }
    }

    public async editVisitor(user, data: IDataAddNew, id:string, res) {
        if(this.mdwCheckData(data)) return res.render(
            'visitors/edit',
            {   
                status: 'err', 
                err: 'Поля не могут оставаться пустыми', 
                fields: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: data.role, user: user.username} 
            }
        );
        if(+(data.age) <= 0) return res.render(
            'visitors/edit',
            {   
                status: 'err', 
                err: 'Возраст должен быть больше нуля', 
                fields: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: data.role, user: user.username} 
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
                    fields: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: data.role, user: user.username}
                }
            );
        }
        catch(err) {
            console.log(err);
            if(err.errno === 1062) res.render('visitors/edit', { status: 'err', err: 'Этот телефон уже указан для другого пользователя, телефон должен быть уникальным!',
                fields: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: data.role, user: user.username}
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
            let sections = await this.db.get4RelativeTable('users', 'membersofgroup', 'group', 'sportsection', 
            'UserID', 'UserID', 'GroupID', 'GroupID', 'sportSection', 'SpSecID', result[0].UserID);
            let section = '';
            if (sections[0])
            {
                section = sections[0].name;
            }
            return res.render('profile/index', { field: result[0], user: user.username});
        }
        catch (err)
        {
            console.log(err);
        }
    }

    public async getUserSections(user, res) {
        let position = {
            field: 'login',
            mark: null,
            value: user.username
        }
        try
        {
            let result = await this.db.getRow(this.tableName, position);
            let sections = await this.db.get4RelativeTable('users', 'membersщапroup', 'group', 'sportыection', 
            'UserID', 'UserID', 'GroupID', 'GroupID', 'sportSection', 'SpSecID', result[0].UserID);
            let section = [];
            if (sections[0])
            {
                for (let temp in sections)
                {
                    section.push(sections[temp]);
                }
            }
            return res.render('profile/section', {field: result[0], section, user: user.username}); 
        }
        catch (err) 
        {
            console.log(err);
        }
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
        let pos = {
            field: 'login',
            mark: null,
            value: user.username
        }
        let result = await this.db.getRow(this.tableName, pos);
        if (this.mdwCheckData(data))
            return res.render('profile/edit', { status: 'err', mess: 'Поля не должны оставаться пустыми', user: user.username,
                field: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: result[0].Role}
            });
        if (+(data.age) <= 0)
            return res.render('profile/edit', { status: 'err', mess: 'Возраст должен быть больше нуля', user: user.username,
                field: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: result[0].Role}
            });
        
        let position = {
            field: 'login',
            mark: null,
            value: user.username
        }
        let arProps = {
            Name: data.name,
            Age: data.age,
            Address: data.address,
            Phone: data.phone
        }
        try 
        {
            await this.db.updateRow(this.tableName, position, arProps);
            return res.render(
                'profile/edit', 
                { 
                    status: 'update', 
                    mess: 'Успешно изменен', 
                    field: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: result[0].Role},
                    user: user.username
                }
            );
        }
        catch(err) 
        {
            console.log(err);
            if(err.errno === 1062) res.render('profile/edit', { status: 'err', mess: 'Этот телефон уже указан для другого пользователя, телефон должен быть уникальным!',
                field: { Name: data.name, Age: data.age, Address: data.address, Phone: data.phone, Role: result[0].Role}, user: user.username
            });
        } 

    }

}

export let users: Users = new Users;