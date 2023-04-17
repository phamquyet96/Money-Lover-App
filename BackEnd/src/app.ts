import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieSession from "cookie-session";
import AppConfig from "./config/app.config";
import AuthRouter from "./routers/auth.router";
import AuthMiddleware from "./middlewares/auth.middlewares";
import WalletRouter from "./routers/wallet.router";
import UserRouter from "./routers/user.router";
import dataSource from "./database/data-source";
import bodyParser from "body-parser";
class App {
  private app: express.Application = express();

  private appConfig = new AppConfig();

  constructor() {
    this.bootstrap();
  }

  public bootstrap(): void {
    this.setupMiddlewares();
    // this.serveStaticFiles();
    this.listen();
  }

  // Static  files
  /* private serveStaticFiles(): void {
        this.app.use(express.static(path.join(__dirname, 'FileName'), { maxAge:  this.appConfig.expiredStaticFiles}));
    } */

  private setupMiddlewares(): void {
    this.app.use(
      fileUpload({
        createParentPath: true,
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      cookieSession({
        name: "session",
        keys: [this.appConfig.sessionKey],
        maxAge: this.appConfig.sessionMaxAge,
      })
    );
    this.app.use(
      cors()
    );
    this.app.use("/api/auth",cors(), AuthRouter);
    this.app.use(AuthMiddleware.checkAuthentication);
    this.app.use("/api/wallet", WalletRouter);
    this.app.use("/api/user",cors(), UserRouter);
  }

  private listen(): void {
    this.app.listen(this.appConfig.port, () => {
      console.log(`server started at http://localhost:${this.appConfig.port}`);
    });
  }
}

// tslint:disable-next-line:no-unused-expression
new App();


// npm run dev:start