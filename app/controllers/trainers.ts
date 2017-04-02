import Controller from './controller';

class Trainers extends Controller {

    public async getTrainers(res) {
        try {
            return res.json(await this.db.getTable('test'));
        }
        catch (err) {
            console.log(err);
        }
    }   

}

const trainers = new Trainers();

export function getTrainers(req, res) {
    return trainers.getTrainers(res);
}

