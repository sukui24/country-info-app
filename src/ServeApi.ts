import express, { type Express } from "express";
import { CountriesRestApiController } from "./controllers/CountriesRestApiController";

/**
 * Serves all api controllers.
 */
export class ServeApi {
  constructor(
    private readonly app: Express,
    private readonly port: number
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

      // Attach API controllers
      this._attachControllers();
    } catch (err: unknown) {
      console.log(err);
    }
  }

  private _attachControllers() {
    new CountriesRestApiController(this.app);
  }
}
