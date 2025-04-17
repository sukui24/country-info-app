import { Express, Request, Response, Router } from "express";
import Joi from "joi";

import { CalendarService } from "../services/calendar/CalendarService";
import { UserService } from "../services/user/UserService";
import { CalendarEventDTO } from "../types/dto/calendar/CalendarEventDTO";

export class CalendarRestApiController {
  constructor(
    private readonly app: Express,
    private readonly calendarService: CalendarService,
    private readonly userService: UserService
  ) {
    const router = Router();

    this.app.use("/api/v1/users", router);

    router.post("/:userId/calendar/holidays", this.addHolidayToCalendar);
  }

  private addHolidayToCalendar = async (req: Request, res: Response) => {
    try {
      const { error, value } = Joi.object<CalendarEventDTO>({
        year: Joi.number().required(),
        countryCode: Joi.string().length(2).required(),
        holidays: Joi.array().items(Joi.string()),
      }).validate(req.body);

      if (error) {
        throw new Error(`Validation error: ${error.message}`);
      }

      const user = await this.userService.getUser(Number(req.params.userId));

      if (!user) {
        throw new Error("User not found");
      }

      const result = await this.calendarService.addHoliday(user, value);
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
