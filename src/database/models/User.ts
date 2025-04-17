import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CalendarEvent } from "./CalendarEvent";

// TODO: User should have more fields in real apps
@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => CalendarEvent, (event) => event.user)
  calendarEvents!: CalendarEvent[];
}
