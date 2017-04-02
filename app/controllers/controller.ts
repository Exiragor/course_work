import connect from '../models';
import config from '../config';

class Controller {
    db: any;

    constructor() {
        this.db = new connect(config.dbConfig);
    }
}

export default Controller;