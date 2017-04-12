import Controller from './Controller';

class Generator extends Controller {

    NamesM: string[];
    NamesW: string[];
    SecondNamesM: string[];
    SecondNamesW: string[];
    arCity: string[];
    numUser: number;

    constructor() {
        super();
        this.NamesM = ['Павел', 'Александр', 'Игорь', 'Алексей', 'Артём', 'Влад', 'Иван', 'Денис', 'Андрей', 'Антон', 'Генадий', 'Фёдор', 'Максим', 'Олег', 'Борис', 'Ярослав'];
        this.NamesW = ['Анастасия', 'Екатерина', 'Ольга', 'Виктория', 'Анна', 'Светлана', 'Наталья', 'Софья', 'Мария', 'Марина'];
        this.SecondNamesM = ['Петров', 'Орлов', 'Лебедев', 'Катков', 'Борисов', 'Простов', 'Кругов', 'Куликов', 'Байков', 'Зайцев', 'Ежов', 'Нещадин', 'Помелов'];
        this.arCity = ['Москва', 'Новосибирск', 'Владивосток', 'Пушкино', 'Старый оскол', 'Томбов', 'Екатеренбург', 'Казань', 'Ивантеевка'];
        this.SecondNamesW = this.SecondNamesM.map((secondName) => {
            return secondName + 'а';
        });
    }

    public async generateTrainers() {
        let table = 'trainer';
        try{
            let arProps = await this.generatePropsForTrainers();
            await this.db.addRow(table, arProps); 
        }
        catch(err) {
            console.log(err);
        }
        
    }

    public async generateVisitors() {
        let table = 'users';
        try{
            let arProps = await this.generatePropsForVisitors();
            await this.db.addRow(table, arProps);
        }
        catch(err) {
            console.log(err);
        }
    }

    private generatePropsForTrainers():Promise<any> {
        return new Promise((resolve, reject) => {
            let arProps: object[] = [];
            let fullname: string;
            for (var i = 0; i < 100; i++){
                if(this.getRandom(0, 2) != 0){
                    let num = this.getRandom(0, this.NamesM.length - 1);
                    let second = this.getRandom(0, this.SecondNamesM.length - 1);
                    fullname = this.SecondNamesM[second] + ' ' + this.NamesM[num];
                   
                }else{
                    let num = this.getRandom(0, this.NamesW.length - 1);
                    let second = this.getRandom(0, this.SecondNamesW.length - 1 );
                    fullname = this.SecondNamesW[second] + ' ' + this.NamesW[num];
                }
                let phone = this.getRandom(0, 8000000);
                let city = this.getRandom(0, this.arCity.length - 1);
                arProps.push({
                    trainerName: fullname,
                    trainerAddress: 'Город ' + this.arCity[city],
                    trainerPhone: `${phone}`,
                    expirience: 'КМС' 
                });    
            }
            resolve(arProps);  
        });
    }

    private generatePropsForVisitors():Promise<any> {
        return new Promise((resolve, reject) => {
            let arProps: object[] = [];
            let fullname: string;
            for (var i = 0; i < 100; i++){
                if(this.getRandom(0, 2) != 0){
                    let num = this.getRandom(0, this.NamesM.length - 1);
                    let second = this.getRandom(0, this.SecondNamesM.length - 1);
                    fullname = this.SecondNamesM[second] + ' ' + this.NamesM[num];
                   
                }else{
                    let num = this.getRandom(0, this.NamesW.length - 1);
                    let second = this.getRandom(0, this.SecondNamesW.length - 1 );
                    fullname = this.SecondNamesW[second] + ' ' + this.NamesW[num];
                }
                let phone = this.getRandom(0, 8000000);
                let city = this.getRandom(0, this.arCity.length - 1);
                let age = this.getRandom(8, 41);
                let sportCategory = this.getRandom(1, 4);
                arProps.push({
                    Name: fullname,
                    Age: age,
                    Address: 'Город ' + this.arCity[city],
                    Phone: `${phone}`
                });    
            }
            resolve(arProps);  
        });        
    }

    private getRandom(min, max): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    public async generateMembersForGroup() {
        let table = 'membersOfGroup';
        this.numUser = 101;
        let arProps: Object[] = [];
        for (let i:number = 21; i < 36; i++) {
            for (let j: number = 0; j < 5; j++) {
                arProps.push({
                    GroupID: i,
                    UserID: this.numUser
                });
                this.numUser++;
            }
        }

        try {
            await this.db.addRow(table, arProps);  
        }
        catch(err) {
            console.log(err);
        }
    }

    public async generatePayment() {
        let table = 'payment';
        let arProps: Object[] = [];
        for (let i: number = 0; i < 20; i++)
            arProps.push({
                visitor: this.getRandom(1, 189)
            });
        try {
            await this.db.addRow(table, arProps);
        }
        catch(err) {
            console.log(err);
        }
    }
}

export let generator: Generator = new Generator;