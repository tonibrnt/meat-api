import * as restify from "restify";
import { Router } from "../common/router";
import { User } from "./user.model";

class UserRouter extends Router {
  applyRoutes(application: restify.Server) {
    application.get("/users", (_, res, next) => {
      User.find().then(users => {
        res.json(users);
        return next();
      });
    });

    application.get("users/:id", (req, res, next) => {
      User.findById({ _id: req.params.id }).then(users => {
        res.json(users);
        return next();
      });
    });
  }
}

export const userRouter = new UserRouter();
