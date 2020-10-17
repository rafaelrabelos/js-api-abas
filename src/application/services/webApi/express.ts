import  express from 'express';
import expressPino from 'express-pino-logger';
import { logger, clearPath } from '@app/middlewares';

export class WebApi {
  constructor() {}

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

    app.get(`${prefixApi}/v1/vendas`, (req, res) => { res.send('Hello World!') });

    app.listen(port, () => {
      logger.info(`server started at ${hostname}:${port}`)
    });
  }
}