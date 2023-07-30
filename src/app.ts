import express from "express";
const bodyParser = require("body-parser");
const app_package_json = require('../package.json');

import { RobotRoutes } from "./infrastructure/routes/robot.routes";

class App {
  public app: express.Application;
  public robotRoutes: RobotRoutes = new RobotRoutes();


  public options: any

  constructor() {
    this.app = express();

    //Configure server
    this.config();
    this.robotRoutes.routes(this.app);
  }

  /**
   * Server Configuration Method
   */
  private config(): void {
    //Configure Body-parser
    this.app.use(bodyParser.json({ limit: "500mb" }));
    this.app.use(bodyParser.urlencoded({
        limit: "500mb",
        extended: true,
        parameterLimit: 100000,
      })
    );

    this.app.use((err, req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Credentials", "true");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

      //Check sintax error in request
      if (err instanceof SyntaxError) {
        console.error(err);
        return res.status(500).json(err.message);
      }
      next();
    });

    process.on('uncaughtException', (error, origin)=>
    {
      console.error('uncaughtException!')
      console.error(error.stack)
    })


    // Display on log the package version
    console.info("Service "+app_package_json.name+" v"+app_package_json.version+ " starting...")
  }
}
export default new App().app;
