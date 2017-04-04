import Controller from './controller';

class Generator extends Controller {

    trainerNamesM: string[];
    trainerNamesW: string[];
    trainerSecondNamesM: string[];
    trainerSecondNamesW: string[];

    constructor() {
        super();
        this.trainerNamesM = ['Павел', 'Александр', 'Игорь', 'Алексей', 'Артём', 'Влад', 'Иван', 'Денис', 'Андрей', 'Антон', 'Генадий', 'Фёдор', 'Максим', 'Олег', 'Борис', 'Ярослав'];
        this.trainerNamesW = ['Анастасия', 'Екатерина', 'Ольга', 'Виктория', 'Анна', 'Светлана', 'Наталья', 'Софья', 'Мария'];
        this.trainerSecondNamesM = ['Петров', 'Орлов', 'Лебедев', 'Катков', 'Борисов', 'Простов', 'Кругов', 'Куликов', 'Байков', 'Зайцев', 'Помелов'];
        this.trainerSecondNamesW = this.trainerNamesM.map((secondName) => {
            return secondName + 'а';
        });
    }
    public async generateTrainers() {
        let table = 'trainer';
        try{
            for (var i = 0; i < 100; i++){
                if(Math.random()){
                    let num = this.getRandom(this.trainerNamesM.length - 1);
                    let second = this.getRandom(this.trainerSecondNamesM.length - 1);
                    let phone = this.getRandom(8000000);
                    let arProps = [{
                        trainerName: this.trainerSecondNamesM[second] + this.trainerNamesM[num],
                        trainerAddress: 'Город Москва',
                        trainerPhone: phone,
                        expirience: 'КМС' 
                    }];

                    await this.db.addRow(table, arProps);
                }else{
                    let num = this.getRandom(this.trainerNamesW.length - 1);
                    let second = this.getRandom(this.trainerSecondNamesW.length - 1 );
                    let phone = this.getRandom(8000000);
                    let arProps = [{
                        trainerName: this.trainerSecondNamesW[second] + this.trainerNamesW[num],
                        trainerAddress: 'Город Москва',
                        trainerPhone: phone,
                        expirience: 'КМС' 
                    }];

                await this.db.addRow(table, arProps); 
                }
                
            }
        }
        catch(err) {
            console.log(err);
        }
        
    }

    private getRandom(max) {
        return Math.random() * (max - 1) + 1;
    }
}

export let generator = new Generator();