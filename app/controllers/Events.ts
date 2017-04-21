import Controller from './Controller';

export class Events extends Controller {

    private tableName: string = 'events';

    public async getUserEvents(user, res) 
    {
        let position = {
            field: 'login',
            mark: null,
            value: user.username
        }
        try
        {
            let userInfo = await this.db.getRow('users', position);
            let events = await this.db.getUserEvents(userInfo[0].UserID);
            return res.render('profile/event', {field: userInfo[0], user: user.username, events}); 
        }
        catch (err)
        {
            console.log(err);
        }
    }  
    public async getEventInfo(user, id, res) 
    {
        let userPos = {
            field: 'login',
            mark: null,
            value: user.username
        }
        let position = {
            field: 'EvID',
            mark: null,
            value: id
        }
        try
        {
            let userInfo = await this.db.getRow('users', userPos); 
            let event = await this.db.getRow(this.tableName, position);
            let rooms = await this.db.getRoomsForEvent(id);
            let counts = await this.db.getCountsPlaceForEvent(id);

            return res.render('events/detail', {field: userInfo[0], user: user.username, event: event[0], rooms, counts: counts[0].counts});
        }
        catch (err)
        {
            console.log(err);
        }
    }
    public async getAllEvents(user, res) 
    {
        let userPos = {
            field: 'login',
            mark: null,
            value: user.username
        }
        try
        {
            let userInfo = await this.db.getRow('users', userPos);
            let events = await this.db.getTable(this.tableName);

            return res.render('events/index', {field: userInfo[0], user: user.username, events});
        }
        catch(err)
        {
            console.log(err);
        }
    } 
    public async getAllEventsFilter(user, filter, res) 
    {
        let userPos = {
            field: 'login',
            mark: null,
            value: user.username
        }
        try
        {
            let userInfo = await this.db.getRow('users', userPos);
            let events = await this.db.getTable(this.tableName);
            let result = [];
            for (let item of events)
            {
                if(item.name.indexOf(filter) != -1)
                    result.push(item);
            }

            return res.render('events/index', {field: userInfo[0], user: user.username, events: result});
        }
        catch(err)
        {
            console.log(err);
        }
    }
    public async delUserEvent(user, id, res) {
        let userPos = {
            field: 'login',
            mark: null,
            value: user.username
        }
        let position = {
            field: 'PayID',
            mark: null,
            value: id
        };
        try
        {
            let temp = await this.db.trigger(id);
            await this.db.deleteRow('payment', position);
            let pos = {
                field: 'Cipher',
                mark: null,
                value: temp[0].Cipher
            }
            let props = {
                counts: temp[0].counts + 1
            }
            this.db.updateRow('ticket', pos, props);
            let userInfo = await this.db.getRow('users', userPos);
            let events = await this.db.getUserEvents(userInfo[0].UserID);

            return res.render('profile/event', {field: userInfo[0], user: user.username, events, status: 'del'});
        }
        catch(err)
        {
            console.log(err);
        }
    }  

}

export let events = new Events;