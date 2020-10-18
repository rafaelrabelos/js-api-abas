import Mongo = require("mongoose");

export class MongoClient {

  constructor() {}

  ConnectDB(): Mongo.Connection {
    
    const dbUser = process.env.MONGODB_USER || "root";
    const dbPass = process.env.MONGODB_PASS || "";
    const dbName = process.env.MONGODB_DATABASE || "test";
    const dbHost = process.env.MONGODB_HOST || "mongodb://localhost:27017";
    const dbEnv = process.env.MONGODB_ENV || "local";
    
    let connectionString: string;

    if(dbEnv === 'local'){
      connectionString = `${dbHost}/${dbName}`;
    }
    else{
      connectionString = dbHost.replace('<MONGODB_USER>',dbUser).replace('<MONGODB_PASS>', dbPass).replace('<MONGODB_DATABASE>', dbName);
      
    }
    console.log(connectionString)
    Mongo.connect(connectionString, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    Mongo.connection.once("open", async (res) => {
      console.log(`Connected to Mongo @cluster0.4eoxp.gcp.mongodb.net/${dbName}`);
    });

    Mongo.connection.on("error", (err) => {
      console.log("Error connecting to @cluster0.4eoxp.gcp.mongodb.net");
      console.log(err);
    });

    return Mongo.connection;   
  }
}
