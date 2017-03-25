export default class Config { 
    self = this; 
    port = 4400;
    sqlHost = 'localhost';
    sqlUser = 'root';
    sqlPass = 'root';
    sqlDB = 'course-work';
    mode = 'dev';
    appMode = mode || 'production';

    static getPort() {
        return this.port;
    }

    static getSqlProps() {
        return {
            host: this.sqlHost,
            user: this.sqlUser,
            pass: this.sqlPass,
            db: this.sqlDB
        }
    } 

    static getMode() {
        return this.appMode;
    } 
}

