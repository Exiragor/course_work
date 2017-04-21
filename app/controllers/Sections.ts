import Controller from './Controller';

export class Sections extends Controller {

     private tableName: string = 'sportsection';

     public async getSectionInfo(user, id, res) 
     {
         let position = {
            field: 'SpSecID',
            mark: null,
            value: id
         }
         let userPos = {
            field: 'login',
            mark: null,
            value: user.username
        }
         try
         {
            let userInfo = await this.db.getRow('users', userPos);
            let result = await this.db.getRow(this.tableName, position);
            let trainers = await this.db.getTrainersOfSection(id);
            let rooms = await this.db.getRoomsOfSection(id);
            return res.render('sections/detail', {field: userInfo[0], user: user.username, section: result[0], trainers, rooms});
         }
         catch (err)
         {
             console.log(err);
         }

     }
     public async getAllSections(user, res)
     {
        let userPos = {
            field: 'login',
            mark: null,
            value: user.username
        }
        try
        {
            let userInfo = await this.db.getRow('users', userPos);
            let sections = await this.db.getTable('sportsection');
            return res.render('sections/index', {field: userInfo[0], user: user.username, sections})
        }
        catch (err)
        {
            console.log(err);
        }
     }
     public async getAllSectionsFilter(user, filter, res)
     {
        let userPos = {
            field: 'login',
            mark: null,
            value: user.username
        }
        try
        {
            let userInfo = await this.db.getRow('users', userPos);
            let sections = await this.db.getTable('sportsection');
            let result = [];
            for (let item of sections)
            {
                if(item.name.indexOf(filter) != -1)
                    result.push(item);
            }
            return res.render('sections/index', {field: userInfo[0], user: user.username, sections: result})
        }
        catch (err)
        {
            console.log(err);
        }
     }

}

export let sections = new Sections;