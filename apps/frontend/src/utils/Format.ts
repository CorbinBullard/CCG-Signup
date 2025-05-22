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
    // too long for nesting
    const fields = signup.event.form.fields;
    console.log(
      "Fields, \n",
      fields,
      "\nEVENT FIELDS: \n",
      signup.event.form.fields
    );
    const responseLookup = signup.responses.reduce((acc, curr) => {
      acc[curr.fieldId] = curr;
      return acc;
    }, {});
    console.log(fields);
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
    console.log("Field", field.label, value, field);

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
          value = Format.Date(response.value);
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
        // VALUE MUST BE WITHIN SELECT OPTIONS!!!
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
        const compositeValues = response.value;
        const compositeField = response.field.subfields;
        const formattedValues = compositeValues.map((compositeValue) => {
          console.log("comp values", compositeValue);
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
    // console.log("RETURN: ", { fieldId, value });
    return { fieldId, value };
  }
}

function formatCompositeFieldValues(fields, values) {
  return values.map((value, index) => {
    return Format.Response({ value: value.value }, fields[index]);
  });
}
