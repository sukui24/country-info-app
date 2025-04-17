import { Repository } from "typeorm";

import { CalendarEventSaveDTO } from "../../types/dto/calendar/CalendarEventSaveDTO";
import { CalendarEvent } from "../models/CalendarEvent";
import { User } from "../models/User";

export class CalendarRepository {
  constructor(private readonly repository: Repository<CalendarEvent>) {
    //
  }

  public async saveEvents(user: User, eventData: CalendarEventSaveDTO[]) {
    const events: CalendarEvent[] = [];

    for (const holiday of eventData) {
      const event = new CalendarEvent();
      event.created_at = new Date();
      event.event_date = new Date(holiday.date);
      event.title = holiday.name;
      event.user = user;
      events.push(event);
    }

    await this.repository.save(events);
    return events;
  }
}
