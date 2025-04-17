import { CalendarRepository } from "../database/repositories/CalendarRepository";
import { UserRepository } from "../database/repositories/UserRepository";
import { CalendarService } from "./calendar/CalendarService";
import { CountriesService } from "./countries/CountriesService";
import { HttpService } from "./http/HttpService";
import { UserService } from "./user/UserService";

/**
 * Simple server services locator.
 *
 * TODO: Better approach is to implement dependency injection container or use library
 */
export class ServerServices {
  private _countries!: CountriesService;
  private _http!: HttpService;
  private _calendar!: CalendarService;
  private _user!: UserService;

  public init(deps: {
    calendarRepo: CalendarRepository;
    userRepository: UserRepository;
  }) {
    this._http = new HttpService();
    this._countries = new CountriesService(this._http);
    this._calendar = new CalendarService(this._http, deps.calendarRepo);
    this._user = new UserService(deps.userRepository);
  }

  public get countries() {
    return this._countries;
  }

  public get http() {
    return this._http;
  }

  public get calendar() {
    return this._calendar;
  }

  public get user() {
    return this._user;
  }
}
