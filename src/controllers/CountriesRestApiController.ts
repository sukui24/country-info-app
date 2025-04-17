import { Express, Request, Response, Router } from "express";

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
      const result = await this.countriesService.getCountryBorders(
        String(req.params.countryCode)
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
      const result = await this.countriesService.getCountryPopulationData(
        String(req.params.countryCode)
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
      const result = await this.countriesService.getCountryFlag(
        String(req.params.countryCode)
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
