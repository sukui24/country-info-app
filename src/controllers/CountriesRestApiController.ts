import { Express, Request, Response, Router } from "express";

export class CountriesRestApiController {
  constructor(private readonly app: Express) {
    const router = Router();

    this.app.use("/api/v1/countries", router);

    router.get("/", this.handleGet);
  }

  // TODO: implement
  private handleGet(req: Request, res: Response) {
    res.send("Hello from countries controller");
  }
}
