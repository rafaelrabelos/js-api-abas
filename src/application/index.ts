import { WebApi } from './services/webApi/express';
import { VendasControllers } from '@src/presentation';
import dotenv from 'dotenv';

export class Application {
    constructor(){
        this.LoadAppEnv();
    }

    RunAppServices() {
        const application = new WebApi([VendasControllers]);
        application.Run();
    }

    private LoadAppEnv(){
        dotenv.config();
    }
}