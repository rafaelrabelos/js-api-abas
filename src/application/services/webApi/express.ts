import  express from 'express';
import expressPino from 'express-pino-logger';
import { logger, clearPath } from '@app/middlewares';
import { RoutersModel } from '@domain/models/index';

export class WebApi {

  routers: RoutersModel[];

  constructor(routers: RoutersModel[]) {
    this.routers = routers;
  }

  Run() {
    const app = express();
    const os = require('os');
    const expressLogger = expressPino({ logger });

    const hostname = os.hostname();
    const port = process.env.PORT || 8086;
    const prefixApi = '/api';

    app.use(expressLogger);
    app.use(express.json());
    app.use(clearPath)

    this.routers.forEach((router) => {
      const path = prefixApi + router.Version + router.Prefix;
      const apiBaseUrl = hostname + ':' + port + path;

      app.use(path, router.Routes);
      logger.info(router.Routes.stack.map((r) => apiBaseUrl + r.route.path))
    });
    app.listen(port, () => {
      logger.info(`server started at ${hostname}:${port}`)
    });
  }
}