import * as knex from 'knex';

interface Position {
    field: string,
    mark: string | null,
    value: string
}

 class Tasks {
    private db: any;

    constructor(dbConf: object) {
        this.db = knex({
            client: 'mysql',
            connection: dbConf
        });   
    }

    public getTable(name: String):Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.select().table(name)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                });
        });

    }

    public getRow(table: string, pos: Position): Promise<any>{
        return new Promise((resolve, reject) => {
            let whereProps: string[];

            if(pos.mark === null)
                whereProps = [pos.field, pos.value];
            else
                whereProps = [pos.field, pos.mark, pos.value];

            this.db(table).select().where(...whereProps)
                .then((res => {
                    resolve(res);
                }))
                .catch((err) => {
                    reject(err)
                });
        });
    }

    public addRow(name: String, arProps: object[]):Promise<any> {
        return new Promise((resolve, reject) => {
            this.db(name).insert(arProps)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                });
        });
    }

    public updateRow(name: String, pos: Position, Props: object):Promise<any> {
        return new Promise((resolve, reject) => {
            let whereProps: String[];

            if(pos.mark === null)
                whereProps = [pos.field, pos.value];
            else
                whereProps = [pos.field, pos.mark, pos.value];

            this.db(name)
                .where(...whereProps)
                .update(Props)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    public deleteRow(name: string, pos: Position): Promise<any> {
        return new Promise((resolve, reject) => {
            let whereProps: String[];

            if(pos.mark === null)
                whereProps = [pos.field, pos.value];
            else
                whereProps = [pos.field, pos.mark, pos.value];

            this.db(name)
                .where(...whereProps)
                .del()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
        });
    }

    public get4RelativeTable(table1: string, table2: string, table3: string, table4: string,
        field1: string, field2: string, field3: string, field4: string, field5: string, field6: string, id: number)
    {
        return new Promise((resolve, reject) => {
            this.db.from(table1)
            .innerJoin(table2, table1 + '.' + field1, table2 + '.' + field2)
            .innerJoin(table3, table2 + '.' + field3, table3 + '.' + field4)
            .innerJoin(table4, table3 + '.' + field5, table4 + '.' + field6)
            .where('users.UserID', id)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);                        
                });
        });
    }
    public getTrainersOfSection(sectionID: number) 
    {
        return new Promise((resolve, reject) => {
            this.db.from('sectionCoach')
            .innerJoin('trainer', 'sectionCoach.TrainerID', 'trainer.TrainerID')
            .where('SpSecID', sectionID)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    public getRoomsOfSection(sectionID: number)
    {
       return new Promise((resolve, reject) => {
            this.db.from('roomForSportSection')
            .innerJoin('room', 'roomForSportSection.RoomID', 'room.RoomID')
            .where('SpSecID', sectionID)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        }); 
    }
    public getUserEvents(id) 
    {
        return new Promise((resolve, reject) => {
            this.db.from('payment')
            .innerJoin('paymentforticket', 'payment.PayID', 'paymentforticket.PayID')
            .innerJoin('ticket', 'paymentforticket.Cipher', 'ticket.Cipher')
            .innerJoin('events', 'ticket.event', 'events.EvID')
            .where('visitor', id)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    public getRoomsForEvent(id)
    {
        return new Promise((resolve, reject) => {
            this.db.from('events')
            .innerJoin('roomforevents', 'events.EvID', 'roomforevents.EvID')
            .innerJoin('room', 'roomforevents.RoomID', 'room.RoomID')
            .where('events.EvID', id)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    public getSectionsForTrainer(id) 
    {
        return new Promise((resolve, reject) => {
            this.db.from('trainer')
            .innerJoin('sectioncoach', 'trainer.TrainerID', 'sectioncoach.TrainerID')
            .innerJoin('sportsection', 'sectioncoach.SpSecID', 'sportsection.SpSecID')
            .where('trainer.TrainerID', id)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    public getCountsPlaceForEvent(id) 
    {
        return new Promise((resolve, reject) => {
            this.db.from('events')
            .innerJoin('ticket', 'events.EvID', 'ticket.event')
            .where('events.EvID', id)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    public trigger(PayID) 
    {
        return new Promise((resolve, reject) => {
            this.db.from('ticket')
            .innerJoin('paymentforticket', 'ticket.Cipher', 'paymentforticket.Cipher')
            .innerJoin('payment', 'paymentforticket.PayID', 'payment.payID')
            .where('payment.payID', PayID)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

}

export default Tasks;