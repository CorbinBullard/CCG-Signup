import dayjs from "dayjs";
import { Event } from "../features/events/event.types";
import { Field, FieldTypeEnum } from "../features/fields/field.type";
import { Response } from "../features/signups/types/response.type";
import { Signup } from "../features/signups/types/signup.type";
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
      signupLimit: +event.signupLimit,
    };
  }

  static Signup(signup: Signup): object {
    const fields = signup.event.form.fields;
    const responseLookup = signup.responses.reduce((acc, curr) => {
      acc[curr.fieldId] = curr;
      return acc;
    }, {});
    return {
      ...signup,
      responses: fields.map((field) =>
        Format.Response(responseLookup[field.id], field)
      ),
    };
  }

  static Response(response: Response, field: Field): object {
    const fieldId = field.id || undefined;
    let value = response?.value;

    switch (field.type) {
      case FieldTypeEnum.Text: {
        if (typeof value !== "string") value = null;
        break;
      }
      case FieldTypeEnum.Switch: {
        if (typeof value !== "boolean") value = false;
        break;
      }
      case FieldTypeEnum.Date: {
        const dateTest = dayjs(value);
        if (!dayjs.isDayjs(dateTest)) {
          value = null;
        } else {
          value = Format.Date(value);
        }
        break;
      }
      case FieldTypeEnum.Email: {
        if (typeof value !== "string") value = null;
        break;
      }
      case FieldTypeEnum.Number: {
        if (typeof value !== "number") value = null;
        break;
      }
      case FieldTypeEnum.Select: {
        if (!field.options) {
          value = null;
          break;
        }
        const options = field.options.map((option) => option.label);
        if (!options.includes(value)) value = null;
        break;
      }

      case FieldTypeEnum.Composite: {
        if (!Array.isArray(value)) {
          value = null;
          break;
        }
        const compositeValues = response.value;
        const compositeField = response.field.subfields;
        value = formatCompositeFieldValues(compositeField, compositeValues);
        break;
      }

      case FieldTypeEnum.MultiResponse: {
        if (!Array.isArray(value)) {
          value = null;
          break;
        }
        const compositeValues = response?.value;
        const compositeField = response?.field.subfields;
        const formattedValues = compositeValues.map((compositeValue) => {
          return {
            value: formatCompositeFieldValues(
              compositeField,
              compositeValue.value
            ),
          };
        });

        value = formattedValues;
        break;
      }
      default:
        break;
    }
    return { fieldId, value };
  }

  static isResponseValid(field: Field, response: Response): boolean {
    const { value } = response;

    switch (field.type) {
      case FieldTypeEnum.Text:
        return typeof value === "string";

      case FieldTypeEnum.Switch:
        return typeof value === "boolean";

      case FieldTypeEnum.Date:
        return dayjs(value).isValid();

      case FieldTypeEnum.Email:
        return typeof value === "string" && isValidEmail(value);

      case FieldTypeEnum.Number:
        return typeof value === "number";

      case FieldTypeEnum.Select:
        return field.options?.some((option) => option.label === value);

      case FieldTypeEnum.Composite:
        return (
          Array.isArray(value) &&
          field.subfields.every((subfield, index) =>
            Format.isResponseValid(subfield, { value: value[index]?.value })
          )
        );

      case FieldTypeEnum.MultiResponse:
        return (
          Array.isArray(value) &&
          value.every(
            (item) =>
              Array.isArray(item.value) &&
              field.subfields.every((subfield, index) =>
                Format.isResponseValid(subfield, {
                  value: item.value[index]?.value,
                })
              )
          )
        );

      default:
        return false;
    }
  }
}

function formatCompositeFieldValues(fields, values) {
  return values.map((value, index) => {
    return Format.Response({ value: value.value }, fields[index]);
  });
}
