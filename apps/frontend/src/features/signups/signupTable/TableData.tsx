import {
  Alert,
  Descriptions,
  DescriptionsProps,
  Empty,
  TableColumnsType,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { Event } from "../../events/event.types";
import { Response } from "../types/response.type";
import { Field, FieldTypeEnum } from "../../fields/field.type";
import { Form } from "../../forms/form.types";
import { Signup } from "../types/signup.type";
import dayjs from "dayjs";
import { JSX } from "react";
import { isValidEmail } from "../../../utils/utilFunctions";
import { EditOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import OptionsButton from "../../../components/common/OptionsButton";
import getMenuItems from "./getMenuItems";
import { deleteSignup } from "../signups.api";
import Format from "../../../utils/Format";

export class TableData {
  private form: Form;
  private fields: Field[];
  private signups: Signup[];

  public deleteSignup: (id: number) => void;
  public editSignup: (id: number) => void;

  public fieldLookupObj: Record<string, Field>;
  public signupLookupObj: Record<string, Signup>;
  public columns: TableColumnsType<unknown>;
  public data: TableProps;
  public expandedTables: JSX.Element[];

  constructor(
    private event: Event,
    _signups: Signup[],
    { deleteSignup, editSignup }
  ) {
    this.form = event.form;
    this.fields = this.form.fields;
    this.signups = _signups;

    this.fieldLookupObj = this.buildFieldObject();
    this.signupLookupObj = this.buildSignupLookupObject();
    this.columns = this.buildColumns();
    this.expandedColumns = this.buildExpandedColumns();

    // Data
    this.data = this.buildData();
    this.expandedData = [];

    //Fn
    this.deleteSignup = deleteSignup;
    this.editSignup = editSignup;
  }
  buildSignupLookupObject(): Record<string, Signup> {
    return this.signups.reduce((acc, signup) => {
      acc[signup.id] = signup;
      return acc;
    }, {} as Record<string, Signup>);
  }

  buildFieldObject(): Record<string, Field> {
    return this.fields.reduce((acc, field) => {
      acc[field.id] = field;
      return acc;
    }, {} as Record<string, Field>);
  }

  buildColumns(): TableColumnsType<any> {
    const columns = this.fields.map((field) => {
      return {
        title: field.label,
        dataIndex: field.id,
        key: field.id,
        render: (value: any) => {
          return value;
        },
      };
    });
    columns.push({
      title: "Note",
      dataIndex: undefined,
      key: undefined,
      width: 10,
      render: ({ id }) => {
        const note = this.signupLookupObj[id].note;
        if (!note) return;
        return (
          <Tooltip trigger={"hover"} title={note}>
            <QuestionCircleOutlined
              style={{
                // width: "100%",
                color: "skyblue",
                fontSize: "large",
              }}
            />
          </Tooltip>
        );
      },
    });

    // Make into dropdown with edit and delete
    columns.push({
      width: 10,
      render: (record) => {
        return (
          <OptionsButton
            items={getMenuItems({
              name: "Signup",
              handleDelete: () => this.deleteSignup(record.id),
              handleEdit: () => this.editSignup(record.id),
            })}
          />
        );
      },
      title: "",
      dataIndex: undefined,
      key: undefined,
    });
    return columns;
  }

  buildExpandedColumns(): TableColumnsType<unknown>[] | null {
    const multiResponseFields: Field[] = this.fields.filter(
      (field) => field.type === FieldTypeEnum.MultiResponse
    );
    if (!multiResponseFields) return null;

    const MRFields = multiResponseFields.map((field) => {
      if (!field) throw new Error("Multi Response Field has no subfields");
      const { subfields } = field;
      return subfields?.map((subfield, index) => {
        return { title: subfield.label, dataIndex: index, key: index };
      });
    });
    return MRFields;
  }

  buildData(): TableProps["dataSource"] {
    return this.signups.map((signup, signupIndex) => {
      const row: Record<string, any> = { key: signupIndex, id: signup.id };

      const multiResponses: {
        label: string;
        data: any[];
        columns: TableColumnsType<any>;
      }[] = [];

      signup.responses.forEach((response: Response) => {
        const field = this.fieldLookupObj[response.fieldId];
        if (!field) {
          console.warn("Field not found:", response);
          return;
        }
        // render empty value
        if (!field.required && response.value === null) {
          console.log("FIELD NOT FOUND: ", field);
          return <Empty />;
        }

        switch (field.type) {
          case FieldTypeEnum.MultiResponse: {
            const multiResponseData =
              this.buildMutliResponseFieldData(response);
            if (typeof multiResponseData !== "string") {
              multiResponses.push(multiResponseData);
              row[field.id] = multiResponseData.label;
            } else {
              row[field.id] = multiResponseData; // Error message JSX
            }
            break;
          }

          case FieldTypeEnum.Switch:
            row[field.id] = this.buildSwitchFieldData(response);
            break;

          case FieldTypeEnum.Email:
            row[field.id] = this.buildEmailFieldData(response);
            break;

          case FieldTypeEnum.Date:
            row[field.id] = this.buildDateFieldData(response);
            break;

          case FieldTypeEnum.Composite:
            row[field.id] = this.buildCompositeFieldData(response);
            break;

          default:
            row[field.id] = this.withValidation<any>(
              response,
              (val): val is any => val !== undefined && val !== null,
              (val) => `${val}`
            );
            break;
        }
      });

      // Only attach if multiResponses exist
      if (multiResponses.length > 0) {
        row._multiResponses = multiResponses;
      }

      return row;
    });
  }
  private buildSwitchFieldData(response: Response): JSX.Element {
    return this.withValidation<boolean>(
      response,
      (val): val is boolean => typeof val === "boolean",
      (val) =>
        val ? <Tag color="success">YES</Tag> : <Tag color="error">NO</Tag>
    );
  }
  private buildEmailFieldData(response: Response): JSX.Element {
    return this.withValidation<string>(
      response,
      (val): val is string => typeof val === "string" && isValidEmail(val),
      (val) => <a>{val}</a>
    );
  }
  private buildDateFieldData(response: Response): JSX.Element {
    return this.withValidation<string>(
      response,
      (val): val is string => typeof val === "string" && dayjs(val).isValid(),
      (val) => dayjs(val).format("M/DD/YYYY")
    );
  }

  private buildCompositeFieldData(response: Response): JSX.Element {
    return this.withValidation<any[]>(response, Array.isArray, (values) => {
      const field = this.fieldLookupObj[response.fieldId];
      const items: DescriptionsProps["items"] = values.map((value, index) => {
        console.log(field.type);
        return {
          label: field.subfields[index].label,
          children:
            field.subfields[index].type === FieldTypeEnum.Date
              ? Format.Date(value.value).format("DD/MM/YYYY")
              : value.value,
          style: { whiteSpace: "nowrap" },
        };
      });
      return <Descriptions items={items} size="small" layout="vertical" />;
    });
  }

  private buildMutliResponseFieldData(response: Response) {
    const { value: values } = response;

    if (!Array.isArray(values) || !Array.isArray(values[0]?.value))
      return this.renderError("Invalid Value", response.value);

    const field = this.fieldLookupObj[response.fieldId];

    const data = values.map((valueArr, rowIndex) => {
      const rowData: Record<string, any> = { key: rowIndex };
      field.subfields.forEach((subfield, subfieldIndex) => {
        rowData[`field_${subfieldIndex}`] = valueArr.value[subfieldIndex].value;
      });
      return rowData;
    });

    return {
      label: `${values.length} ${field.label}(s)`,
      fieldLabel: field.label,
      data,
      columns: field.subfields.map((subfield, index) => ({
        title: subfield.label,
        dataIndex: `field_${index}`,
        key: `field_${index}`,
      })),
    };
  }

  private withValidation<T>(
    response: Response,
    validator: (value: any) => value is T,
    render: (validatedValue: T) => JSX.Element | string
  ): JSX.Element | string {
    const value = response.value;
    if (!validator(value)) {
      return this.renderError("Invalid Value", value);
    }
    return render(value);
  }

  renderError(message: string, value: any) {
    return (
      <Alert message={`${message}: ${value}`} type="error" showIcon banner />
    );
  }
}
