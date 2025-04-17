import express, { type Express } from "express";
import { CalendarRestApiController } from "./controllers/CalendarRestApiController";
import { CountriesRestApiController } from "./controllers/CountriesRestApiController";
import { UserRestApiController } from "./controllers/UserRestApiController";
import { Database } from "./database/Database";
import { CalendarEvent } from "./database/models/CalendarEvent";
import { User } from "./database/models/User";
import { CalendarRepository } from "./database/repositories/CalendarRepository";
import { UserRepository } from "./database/repositories/UserRepository";
import { ServerServices } from "./services/ServerServices";

/**
 * Serves all api controllers.
 */
export class ServeApi {
  constructor(
    private readonly app: Express,
    private readonly port: number,
    private readonly db: Database,
    private readonly serverServices: ServerServices
  ) {
    //
  }

  public async init() {
    try {
      // Initialize database connection
      await this.db.init();

      // Middlewares
      this.app.use(express.json());

      // Initialize server listening
      this.app.listen(this.port, () => {
        console.log(`App listening on port: ${this.port}`);
      });

      // TODO: Should be done via dependency container
      const calendarRepository = new CalendarRepository(
        this.db.getRepository(CalendarEvent)
      );
      const userRepository = new UserRepository(this.db.getRepository(User));

      this.serverServices.init({
        calendarRepo: calendarRepository,
        userRepository: userRepository,
      });

      // Attach API controllers
      this._attachControllers();
    } catch (err: unknown) {
      console.log(err);
    }
  }

  private _attachControllers() {
    new CountriesRestApiController(this.app, this.serverServices.countries);
    new CalendarRestApiController(
      this.app,
      this.serverServices.calendar,
      this.serverServices.user
    );
    new UserRestApiController(this.app, this.serverServices.user);
  }
}
