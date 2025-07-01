import UniqueNameField from "../../components/formComponents/UniqueField";
import { useDevices } from "./hooks/useDevices";

export default function DevicesForm() {
  return (
    <UniqueNameField
      label={"Device Name"}
      name={"name"}
      getItemsQueryFn={useDevices}
    />
  );
}
