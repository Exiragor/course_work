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

    private tableName: String = 'trainer';

    public async getTrainers(res: any) {
        try {
            await this.db.getTable(this.tableName).then(result => {
                return res.json(result);
            });
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

}

export let trainers: Trainers = new Trainers;




