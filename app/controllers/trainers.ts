import Controller from './controller';

interface postData {
    name: String,
    address: String,
    phone: String,
    exp: String
}

class Trainers extends Controller {
    tableName: String = 'trainer';

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
        }
    }

}

const trainers = new Trainers();

export function getTrainers(req, res) {
    return trainers.getTrainers(res);
}

export function addTrainer(req, res) {
    return trainers.addTrainer(req.body, res);
}

