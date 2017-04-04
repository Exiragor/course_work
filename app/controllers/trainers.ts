import Controller from './controller';

interface postData {
    name: String,
    address: String,
    phone: String,
    exp: String
}

export class Trainers extends Controller {

    private tableName: String = 'trainer';

    public async getTrainers(res: any) {
        try {
            return res.json(await this.db.getTable(this.tableName));
        }
        catch (err) {
            console.log(err);
        }
    }

    public async addTrainer(data:postData, res: any) {
        try{
            let arProps = [{
                trainerName: data.name,
                trainerAddress: data.address,
                trainerPhone: data.phone,
                expirience: data.exp 
            }];
            await this.db.addRow(this.tableName, arProps)
                .then((result) => {
                    res.send('успешно');
                });
        }
        catch(err) {
            console.log(err);
            res.send('ошибка');
        }
    }

    public async editTrainer(id:any, data: any, res:any) {
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

export let trainers = new Trainers();




