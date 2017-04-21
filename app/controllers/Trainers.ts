import Controller from './Controller';

interface INewTrainer {
    name: string,
    address: string,
    phone: string,
    exp: string
}

interface IEditTrainer {
    trainerName: string,
    trainerAddress: string,
    trainerPhone: string,
    expirience: string
}

export class Trainers extends Controller {

    private tableName: string = 'trainer';

    public async getTrainers(user, res: any) {
        let userPos = {
            field: 'login',
            mark: null,
            value: user.username
        }
        try {
            let userInfo = await this.db.getRow('users', userPos); 
            let trainers = await this.db.getTable(this.tableName);
            return res.render('trainers/index', {field: userInfo[0], user: user.username, trainers});
        }
        catch (err) {
            console.log(err);
        }
    }
    public async getTrainersFilter(user, filter,  res: any) {
        let userPos = {
            field: 'login',
            mark: null,
            value: user.username
        }
        try {
            let userInfo = await this.db.getRow('users', userPos); 
            let trainers = await this.db.getTable(this.tableName);
            let result = [];
            for (let item of trainers)
            {
                if(item.trainerName.indexOf(filter) != -1)
                    result.push(item);
            }
            return res.render('trainers/index', {field: userInfo[0], user: user.username, trainers: result});
        }
        catch (err) {
            console.log(err);
        }
    }

    public async addTrainer(data: INewTrainer, res: any) {
        try{
            let arProps = [{
                trainerName: data.name,
                trainerAddress: data.address,
                trainerPhone: data.phone,
                expirience: data.exp 
            }];
            await this.db.addRow(this.tableName, arProps);
            res.send('успешно');
        }
        catch(err) {
            console.log(err);
            res.send('ошибка');
        }
    }

    public async editTrainer(id: any, data: IEditTrainer, res: any) {
        try{
            let position = {
                field: 'TrainerID',
                mark: null,
                value: id
            }
            let prop = {
                trainerName: data.trainerName != '' ? data.trainerName : undefined,
                trainerAddress: data.trainerAddress != '' ? data.trainerAddress : undefined,
                trainerPhone: data.trainerPhone != '' ? data.trainerPhone : undefined,
                expirience: data.expirience != '' ? data.expirience : undefined
            }
            await this.db.updateRow(this.tableName, position, prop);
            res.send('успешно');
        }
        catch(err) {
            console.log(err);
            res.send('ошибка');
        }
    }

    public async getTrainer(user, id, res) 
    {
        let userPos = {
            field: 'login',
            mark: null,
            value: user.username
        }
        let position = {
            field: 'TrainerID',
            mark: null,
            value: id
        }
        try {
            let userInfo = await this.db.getRow('users', userPos); 
            let trainer = await this.db.getRow(this.tableName, position);
            let sections = await this.db.getSectionsForTrainer(id); 
            return res.render('trainers/detail', {field: userInfo[0], user: user.username, trainer: trainer[0], sections});
        }
        catch (err) {
            console.log(err);
        }
    }

}

export let trainers: Trainers = new Trainers;




