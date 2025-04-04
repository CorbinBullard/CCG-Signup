import { FieldTypeEnum, SubFieldTypeEnum } from 'src/fields/fieldTypeEnums';
import { Options } from 'src/fields/Options';

export type FieldType = {
  id?: number;
  label: string;
  type: FieldTypeEnum | SubFieldTypeEnum;
  required: boolean;
  options?: Options[];
  subfields?: FieldType[];
};
