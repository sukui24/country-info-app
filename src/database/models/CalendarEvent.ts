import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("calendar_event")
export class CalendarEvent {
  @PrimaryGeneratedColumn()
  id!: string;

  @ManyToOne(() => User, (user) => user.calendarEvents, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user" })
  user!: User;

  @Column("varchar")
  title!: string;

  @CreateDateColumn()
  event_date!: Date;

  @CreateDateColumn()
  created_at!: Date;
}
