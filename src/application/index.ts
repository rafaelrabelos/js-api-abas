import { WebApi } from './services/webApi/express';
import { MongoClient } from '@infra/data/configuration/mongoClient';
import { VendasControllers, VendedorControllers } from '@src/presentation';
import dotenv from 'dotenv';

export class Application {
    constructor(){
        this.LoadAppEnv();
        this.MongoSetup();
    }

    RunAppServices() {
        const application = new WebApi([
            VendasControllers,
            VendedorControllers
        ]);
        application.Run();
    }

    private LoadAppEnv(){
        dotenv.config();
    }

    private MongoSetup() {
        let db = new MongoClient();
        db.ConnectDB();
    }
}