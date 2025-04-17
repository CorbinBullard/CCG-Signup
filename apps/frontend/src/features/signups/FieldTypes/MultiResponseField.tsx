import { Card, FormItemProps } from "antd";
import { SubField } from "../../fields/field.type";
import CreateList from "../../../components/formComponents/CreateList";
import CompositeField from "./CompositeField";

export default function MultiResponseField({
  subfields,
  ...props
}: {
  subfields: SubField[];
  props: FormItemProps;
}) {
  return (
    <Card>
      <CreateList buttonLabel={`Add ${props.label}`} title={props.label}>
        <CompositeField subfields={subfields} {...props} />
      </CreateList>
    </Card>
  );
}
