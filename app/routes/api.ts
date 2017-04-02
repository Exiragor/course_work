import * as express from 'express';
let router = express.Router();
import tasks from '../tasks';
import config from '../config';
let task = new tasks(config.dbConfig);


router.get('/test', async (req, res) => {
    try {
        res.json(await task.getTable('test'));
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/kappa', (req, res) => {
    res.send('kappa-test-keppe');
});

export default router;