/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Event } from 'src/event/entities/event.entity';
import { Field } from 'src/fields/entities/field.entity';
import { FieldTypeEnum } from 'src/fields/fieldTypeEnums';
import { Subfield } from 'src/fields/Subfield';
import { Signup } from 'src/signup/signup.entity';

export function getEventCost(event, signup): number {
  const fields = event?.form?.fields;
  const responses = signup?.responses;
  if (!fields || !responses) return 0;

  const eventCost = +event?.cost || 0;

  const total: number = Math.ceil((eventCost + +Sum(fields, responses)) * 100);
  return total;
}

export function Sum(fields: Field[], responses: { value: any }[]): number {
  return fields.reduce((acc, field, index) => {
    const response = responses[index];
    const cost = (() => {
      switch (field.type) {
        case FieldTypeEnum.boolean:
          return getSwitchCost(field, response);
        case FieldTypeEnum.select:
          return getSelectCost(field, response);
        case FieldTypeEnum.composite:
          return getCompositeCost(field, response);
        case FieldTypeEnum.multiResponse:
          return getMultiResponseCost(field, response);
        default:
          return 0;
      }
    })();

    return (acc += cost || 0);
  }, 0);
}

export default function getResponseCost(
  field: Field | Subfield,
  response,
): number {
  switch (field.type) {
    case FieldTypeEnum.boolean: {
      return getSwitchCost(field, response);
    }
    case FieldTypeEnum.select: {
      return getSelectCost(field, response);
    }
    default:
      return 0;
  }
}
// Switch
export const getSwitchCost = (field: Field, response): number => {
  if (!field.cost) return 0;

  if (response?.value) return field.cost;
  else return 0;
};
// Select
export const getSelectCost = (field: Field, response): number => {
  // console.log('cost select: ', field, response);
  if (!field.options?.some((option) => option.cost)) return 0;
  // console.log(" => \n",field.options.find(option => response.value === option.label));
  return (
    field.options.find((option) => option.label === response?.value)?.cost || 0
  );
};

// Composite ^^
function getCompositeCost(field: Field, response): number {
  const subCost = field.subfields?.reduce((acc, subfield, index) => {
    const subResponse = response?.value[index];
    acc += getResponseCost(subfield, subResponse);
    return acc;
  }, 0);
  if (!subCost) return 0;
  return subCost;
}

// MultiResponse ^^
function getMultiResponseCost(field: Field, response): number {
  let totalCost: number = 0;
  if (field?.cost) totalCost = response?.value?.length * field?.cost;

  totalCost +=
    response?.value?.reduce((acc, response, index) => {
      acc += getCompositeCost(field, response);
      return acc;
    }, 0) || 0;
  return totalCost;
}
