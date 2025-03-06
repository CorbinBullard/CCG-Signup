import { FieldType } from 'src/field/fieldTypes';

export class ResponseValidation {
  static validateType(type: FieldType, value: any) {
    console.log(type, value, typeof value);
    switch (type) {
      case FieldType.string: {
        return typeof value === 'string';
      }
      case FieldType.number: {
        return typeof value === 'number';
      }
      case FieldType.boolean: {
        return typeof value === 'boolean';
      }
      case FieldType.date: {
        return value instanceof Date;
      }
      case FieldType.select: {
        return typeof value === 'string';
      }
      case FieldType.item: {
        return typeof value === 'object';
      }
    }
  }
}
/* 
  Create classes for each type of field that inherits from ResponseValidation
*/
