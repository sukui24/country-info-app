import { Express, Request, Response, Router } from "express";
import Joi from "joi";

import { CountriesService } from "../services/countries/CountriesService";

export class CountriesRestApiController {
  constructor(
    private readonly app: Express,
    private readonly countriesService: CountriesService
  ) {
    const router = Router();

    this.app.use("/api/v1/countries", router);

    router.get("/:countryCode/border", this.getBorderCountries);
    router.get("/:countryCode/population", this.getPopulationData);
    router.get("/:countryCode/flag", this.getCountryFlag);
  }

  private getBorderCountries = async (req: Request, res: Response) => {
    try {
      const { error, value } = Joi.object<{ countryCode: string }>({
        countryCode: Joi.string().length(2).required(),
      }).validate(req.params);

      if (error) {
        throw new Error(`Validation error: ${error.message}`);
      }

      const result = await this.countriesService.getCountryBorders(
        value.countryCode
      );
      res.send(result);
    } catch (err: unknown) {
      // TODO: Implement centralized error handling
      if (err instanceof Error) {
        res.send({ error: err.message });
      } else {
        res.send({ error: "Unknown error" });
      }
    }
  };

  private getPopulationData = async (req: Request, res: Response) => {
    try {
      const { error, value } = Joi.object<{ countryCode: string }>({
        countryCode: Joi.string().length(2).required(),
      }).validate(req.params);

      if (error) {
        throw new Error(`Validation error: ${error.message}`);
      }

      const result = await this.countriesService.getCountryPopulationData(
        value.countryCode
      );
      res.send(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.send({ error: err.message });
      } else {
        res.send({ error: "Unknown error" });
      }
    }
  };

  private getCountryFlag = async (req: Request, res: Response) => {
    try {
      const { error, value } = Joi.object<{ countryCode: string }>({
        countryCode: Joi.string().length(2).required(),
      }).validate(req.params);

      if (error) {
        throw new Error(`Validation error: ${error.message}`);
      }

      const result = await this.countriesService.getCountryFlag(
        value.countryCode
      );
      res.send(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        res.send({ error: err.message });
      } else {
        res.send({ error: "Unknown error" });
      }
    }
  };
}
