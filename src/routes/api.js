import express from 'express';
let router = express.Router();
import tasks from '../tasks';
import config from '../config';
let task = new tasks(config.dbConfig);


router.get('/test', (req, res) => {
    task.getTable('test')
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log(err);
        });
});

export default router;