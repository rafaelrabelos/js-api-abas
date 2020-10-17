import { WebApi } from './services/webApi/express';

export class Application {
    constructor(){}

    RunAppServices() {
        const application = new WebApi();
        application.Run();
    }
}