import  express from 'express';

export class WebApi {
  constructor() {}

  Run() {
    const app = express();
    const os = require('os');

    const hostname = os.hostname();
    const port = process.env.PORT || 8086;
    const prefixApi = '/api';

    app.get(`${prefixApi}/v1/vendas`, (req, res) => { res.send('Hello World!') });

    app.listen(port, () => {
      console.log(`server started at ${hostname}:${port}`)
    });
  }
}