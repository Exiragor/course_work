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

export default Trainers;