import {
  Alert,
  Descriptions,
  DescriptionsProps,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { Event } from "../../events/event.types";
import { Response } from "../types/response.type";
import { Field, FieldTypeEnum } from "../../fields/field.type";
import { Form } from "../../forms/form.types";
import { Signup } from "../types/signup.type";
import dayjs from "dayjs";
import { JSX } from "react";
import { isValidEmail } from "../../../utils/utilFunctions";

export class TableData {
  private form: Form;
  private fields: Field[];
  private signups: Signup[];
  public fieldLookupObj: Record<string, Field>;

  public columns: TableColumnsType<any>;
  public expandedColumns: TableColumnsType<any>[] | null;
  public data: TableProps;
  public expandedData: [];
  constructor(private event: Event) {
    this.form = event.form;
    this.fields = this.form.fields;
    this.signups = this.event.signups;

    this.fieldLookupObj = this.buildFieldObject();
    this.columns = this.buildColumns();
    this.expandedColumns = this.buildExpandedColumns();

    // Data
    this.data = this.buildData();
    this.expandedData = [];

    // console.log("COLUMNS: ", this.columns, "\n", "DATA: ", this.data);
  }
  buildFieldObject(): Record<string, Field> {
    return this.fields.reduce((acc, field) => {
      acc[field.id] = field;
      return acc;
    }, {} as Record<string, Field>);
  }

  buildColumns(): TableColumnsType<any> {
    return this.fields.map((field) => {
      return {
        title: field.label,
        dataIndex: field.id,
        key: field.id,
        render: (value: any) => {
          console.log(value);
          return value;
        },
      };
    });
  }

  buildExpandedColumns(): TableColumnsType<any>[] | null {
    const multiResponseFields: Field[] = this.fields.filter(
      (field) => field.type === FieldTypeEnum.MultiResponse
    );
    if (!multiResponseFields) return null;

    return multiResponseFields.map((field) => {
      if (!field) throw new Error("Multi Response Field has no subfields");
      const { subfields } = field;
      return subfields?.map((subfield, index) => {
        return { title: subfield.label, dataIndex: index, key: index };
      });
    });
  }

  buildData(): TableProps {
    return this.signups.map((signup, index) => {
      const row: Record<string, any> = { key: index };
      const { responses } = signup;

      responses.forEach((response: Response) => {
        const field = this.fieldLookupObj[response.fieldId];
        if (!field) {
          console.warn("Field not found:", response);
          return;
        }

        let value: any;
        switch (field.type) {
          case FieldTypeEnum.CheckBox:
            value = this.withValidation<boolean>(
              response,
              (val): val is boolean => typeof val === "boolean",
              (val) =>
                val ? (
                  <Tag color="success">YES</Tag>
                ) : (
                  <Tag color="error">No</Tag>
                )
            );
            break;
          case FieldTypeEnum.Email:
            value = this.buildEmailFieldData(response);
            break;
          case FieldTypeEnum.Date:
            value = this.buildCheckboxFieldData(response);
            break;

          case FieldTypeEnum.Composite:
            value = this.buildCompositeFieldData(response); // already has validation
            break;

          case FieldTypeEnum.MultiResponse:
            value = this.buildMutliResponseFieldData(response); // already has validation
            break;
          default:
            value = this.withValidation<any>(
              response,
              (val): val is any => val !== undefined && val !== null,
              (val) => `${val}`
            );
            break;
        }
        row[field.id] = value;
      });

      return row;
    });
  }
  private buildEmailFieldData(response: Response): JSX.Element {
    return this.withValidation<string>(
      response,
      (val): val is string => typeof val === "string" && isValidEmail(val),
      (val) => <a>{val}</a>
    );
  }
  private buildCheckboxFieldData(response: Response): JSX.Element {
    return this.withValidation<string>(
      response,
      (val): val is string => typeof val === "string" && dayjs(val).isValid(),
      (val) => dayjs(val).format("M/DD/YYYY")
    );
  }

  private buildCompositeFieldData(response: Response): JSX.Element {
    return this.withValidation<any[]>(response, Array.isArray, (values) => {
      const field = this.fieldLookupObj[response.fieldId];
      const items: DescriptionsProps["items"] = values.map((value, index) => ({
        label: field.subfields[index].label,
        children: value.value,
      }));
      return <Descriptions items={items} />;
    });
  }

  private buildMutliResponseFieldData(response: Response) {
    const { value: values } = response;

    if (!Array.isArray(values))
      return this.renderError("Invalid Value", response.value);
    if (!Array.isArray(values[0]?.value))
      return this.renderError(
        "Invalid Value",
        values.map((val) => val.value).join(" ")
      );

    const field = this.fieldLookupObj[response.fieldId];

    return `${values.length} ${field.label}(s)`;
  }

  private withValidation<T>(
    response: Response,
    validator: (value: any) => value is T,
    render: (validatedValue: T) => JSX.Element | string
  ): JSX.Element | string {
    const value = response.value;
    if (!validator(value)) {
      return this.renderError("Invalid value", value);
    }
    return render(value);
  }

  renderError(message: string, value: any) {
    return (
      <Alert
        message={`${message}: Value: ${value}`}
        type="error"
        showIcon
        banner
      />
    );
  }
}
