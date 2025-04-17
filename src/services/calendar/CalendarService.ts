import { env } from "../../config/env";
import { User } from "../../database/models/User";
import { CalendarRepository } from "../../database/repositories/CalendarRepository";
import { holidaysSchema } from "../../schemas/countries";
import { CalendarEventDTO } from "../../types/dto/calendar/CalendarEventDTO";
import { CalendarEventSaveDTO } from "../../types/dto/calendar/CalendarEventSaveDTO";
import { HolidayDTO } from "../../types/dto/calendar/HolidayDTO";
import { HttpService } from "../http/HttpService";

export class CalendarService {
  constructor(
    private readonly httpService: HttpService,
    private readonly calendarRepository: CalendarRepository
  ) {
    //
  }

  public async addHoliday(user: User, holidayData: CalendarEventDTO) {
    const holidayNames = holidayData.holidays ?? [];

    const holidays = await this.fetchHolidays(
      holidayData.countryCode,
      holidayData.year
    );

    const events: CalendarEventSaveDTO[] = [];

    for (const holiday of holidays) {
      if (holidayNames.length < 1 || holidayNames.includes(holiday.name)) {
        events.push({
          date: holiday.date,
          countryCode: holiday.countryCode,
          name: holiday.name,
        });
      }
    }

    return this.calendarRepository.saveEvents(user, events);
  }

  public async fetchHolidays(countryCode: string, year: number) {
    const url = this._getHolidaysUrl(countryCode, year);
    const result = await this.httpService.get<HolidayDTO>(url, holidaysSchema);
    return result as HolidayDTO[];
  }

  private _getHolidaysUrl(countryCode: string, year: number) {
    return `${env.nagerUrl}/PublicHolidays/${year}/${countryCode}`;
  }
}
