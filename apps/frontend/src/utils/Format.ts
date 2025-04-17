import dayjs, { Dayjs } from "dayjs";
import { Event } from "../features/events/event.types";
export default class Format {
  static Date(date: Date | string): Dayjs {
    return dayjs(date);
  }
  static Time(date: Date | string): Dayjs {
    return dayjs(date, "HH:mm");
  }
  static Event(event: Event): object {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: Format.Date(event.date),
      time: Format.Time(event.time),
      image: event.image,
      funds: event.funds,
      cost: event.cost,
      form: event.form,
    };
  }
}
