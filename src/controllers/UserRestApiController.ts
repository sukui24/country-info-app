import { Express, Request, Response, Router } from "express";
import { UserService } from "../services/user/UserService";

/**
 * ! This controller handles super simple registration logic
 * ! Auth was not required in test task, but we have to assign holidays to user's calendar
 */
export class UserRestApiController {
  constructor(
    private readonly app: Express,
    private readonly userService: UserService
  ) {
    const router = Router();

    this.app.use("/api/v1/users", router);

    router.post("/", this.register);
  }

  // TODO: User should have more fields and input validation on register
  private register = async (req: Request, res: Response) => {
    try {
      const result = await this.userService.createUser();
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
}
