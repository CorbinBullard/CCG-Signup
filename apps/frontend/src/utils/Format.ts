import dayjs, { Dayjs } from "dayjs";
import { Event } from "../features/events/event.types";
import { FieldTypeEnum } from "../features/fields/field.type";
import { Response } from "../features/signups/types/response.type";
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

  static Response(response: Response): object {
    switch (response.field.type) {
      case FieldTypeEnum.Text:
        return {
          fieldId: response.fieldId,
          value: response.value,
        };
      case FieldTypeEnum.Switch:
        return {
          fieldId: response.fieldId,
          value: response.value,
        };
      case FieldTypeEnum.Date:
        return {
          fieldId: response.fieldId,
          value: Format.Date(response.value),
        };

      case FieldTypeEnum.Email:
        return {
          fieldId: response.fieldId,
          value: response.value,
        };
      case FieldTypeEnum.Number:
        return {
          fieldId: response.fieldId,
          value: response.value,
        };
      case FieldTypeEnum.Select:
        return {
          fieldId: response.fieldId,
          value: response.value,
        };
      case FieldTypeEnum.MultiResponse:
        return {
          fieldId: response.fieldId,
          value: response.value,
        };
      case FieldTypeEnum.Composite:
        return {
          fieldId: response.fieldId,
          value: response.value,
        };
      default:
        return {
          fieldId: response.fieldId,
          value: response.value,
        };
    }
  }
}
