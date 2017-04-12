import connect from '../models/dbDriver';
import config from '../config';

class Controller {
    protected db: connect;

    constructor() {
        this.db = new connect(config.dbConfig);
    }
}

export default Controller;