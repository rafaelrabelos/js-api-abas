import  express from 'express';

export class WebApi {
  constructor() {}

  Run() {
    const app = express();
    const os = require('os');

    const hostname = os.hostname();
    const port = 8086;
    
    app.get('/api/v1/vendas', (req, res) => { res.send('Hello World!') });

    app.listen(port, () => {
      console.log(`server started at ${hostname}:${port}`)
    });
  }
}
