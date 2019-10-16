import * as restify from "restify";
import * as mongoose from "mongoose";

import { Router } from "../common/router";
import { environment } from "../common/enviroment";

export class Server {
  application: restify.Server;

  bootstrap(routers: Router[] = []): Promise<Server> {
    return this.initializeDb().then(() =>
      this.initRoutes(routers).then(() => this)
    );
  }

  initializeDb(): mongoose.MongooseThenable {
    (<any>mongoose).Promise = global.Promise;
    return mongoose.connect(environment.db.url, {
      useMongoClient: true
    });
  }

  initRoutes(routers: Router[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = restify.createServer({
          name: "meat-api",
          version: "1.0.0"
        });

        this.application.use(restify.plugins.queryParser());

        //routes
        routers.forEach(router => router.applyRoutes(this.application));

        this.application.listen(environment.server.port, () => {});

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
