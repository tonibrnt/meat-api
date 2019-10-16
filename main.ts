import { Server } from "./server";
import { userRouter } from "./users/user.router";

const server = new Server();
server.bootstrap([userRouter])
  .then(() => {
  console.log("Server is listening on:", server.application.address());
  })
  .catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
  });
