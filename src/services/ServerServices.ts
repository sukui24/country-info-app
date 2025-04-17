import { CountriesService } from "./countries/CountriesService";
import { HttpService } from "./http/HttpService";

/**
 * Simple server services locator.
 *
 * TODO: Better approach is to implement dependency injection container or use library
 */
export class ServerServices {
  private _countries!: CountriesService;
  private _http!: HttpService;

  public init() {
    this._http = new HttpService();
    this._countries = new CountriesService(this._http);
  }

  public get countries() {
    return this._countries;
  }

  public get http() {
    return this._http;
  }
}
