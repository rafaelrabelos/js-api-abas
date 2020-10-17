import { MongoClient } from '@infra/data/configuration/mongoClient';

export class VendasRespository {
  constructor() {}

  async CreateVenda(): Promise<string> {

    let db = new MongoClient();

    return db.ConnectDB()
    .then( (res) => res)
    .catch( (err) => err);
  }
}
