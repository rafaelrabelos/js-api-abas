import { WebApi } from './services/webApi/express';
import dotenv from 'dotenv';

export class Application {
    constructor(){
        this.LoadAppEnv();
    }

    RunAppServices() {
        const application = new WebApi();
        application.Run();
    }

    private LoadAppEnv(){
        dotenv.config();
    }
}