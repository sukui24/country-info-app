import * as lookup from "country-code-lookup";

import { env } from "../../config/env";
import {
  countryBordersSchema,
  countryFlagSchema,
  countryPopulationSchema,
} from "../../schemas/countries";
import { CountryBordersDTO } from "../../types/dto/countries/CountryBordersDTO";
import { CountryFlagDTO } from "../../types/dto/countries/CountryFlagDTO";
import { CountryPopulationRequestPayload } from "../../types/dto/countries/CountryPopulationDTO";
import { HttpService } from "../http/HttpService";

export class CountriesService {
  constructor(private readonly httpService: HttpService) {
    //
  }

  public async getCountryBorders(countryCode: string) {
    const url = this._getCountryBordersUrl(countryCode);
    const result = await this.httpService.get<CountryBordersDTO>(
      url,
      countryBordersSchema
    );
    return result;
  }

  public async getCountryPopulationData(countryCode: string) {
    const url = this._getCountriesPopulationUrl();

    const requiredCountryData = lookup.byIso(countryCode);

    if (!requiredCountryData) {
      throw new Error("Country not found");
    }

    const populationData =
      await this.httpService.post<CountryPopulationRequestPayload>(
        url,
        {
          iso3: requiredCountryData.iso3,
        },
        countryPopulationSchema
      );

    return populationData.data;
  }

  public async getCountryFlag(countryCode: string) {
    const url = this._getCountriesFlagUrl();

    const populationData = await this.httpService.post<CountryFlagDTO>(
      url,
      {
        iso2: countryCode,
      },
      countryFlagSchema
    );

    return populationData.data;
  }

  private _getCountryBordersUrl(countryCode: string) {
    return `${env.nagerUrl}/CountryInfo/${countryCode}`;
  }

  private _getCountriesPopulationUrl() {
    return `${env.countriesUrl}/countries/population`;
  }

  private _getCountriesFlagUrl() {
    return `${env.countriesUrl}/countries/flag/images`;
  }
}
