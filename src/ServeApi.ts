import express, { type Express } from "express";
import { CountriesRestApiController } from "./controllers/CountriesRestApiController";
import { ServerServices } from "./services/ServerServices";

/**
 * Serves all api controllers.
 */
export class ServeApi {
  constructor(
    private readonly app: Express,
    private readonly port: number,
    private readonly serverServices: ServerServices
  ) {
    //
  }

  public async init() {
    try {
      // Middlewares
      this.app.use(express.json());

      // Initialize server listening
      this.app.listen(this.port, () => {
        console.log(`App listening on port: ${this.port}`);
      });

      this.serverServices.init();

      // Attach API controllers
      this._attachControllers();
    } catch (err: unknown) {
      console.log(err);
    }
  }

  private _attachControllers() {
    new CountriesRestApiController(this.app, this.serverServices.countries);
  }
}
