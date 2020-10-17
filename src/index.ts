import 'module-alias/register';
import path = require('path');
import modules from 'module-alias';

const upDir = (baseDir: string) => path.resolve( baseDir + '/..');

modules.addAliases({
    "@root": upDir(__dirname) ,
    "@src": __dirname,
    "@app": __dirname + "/application",
    "@presentation": __dirname + "/presentation",
    "@infra": __dirname + "/infra",
    "@domain": __dirname + "/domain",
    "@environment": upDir(__dirname) + "/environments/"
});

import { Application } from './application';

const app = new Application();
app.RunAppServices();