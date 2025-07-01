/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { ColumnOptions } from 'typeorm';

export function EnumColumnType<T extends Object | any[] | undefined>({
  enumType,
  nullable = false,
}: {
  enumType: T;
  nullable?: boolean;
}): ColumnOptions {
  return process.env.NODE_ENV === 'production'
    ? {
        type: 'enum',
        enum: enumType,
        nullable,
      }
    : {
        type: 'text',
        nullable,
      };
}

export function DecimalColumnType({
  precision = 10,
  scale = 2,
  nullable = false,
}: {
  precision?: number;
  scale?: number;
  nullable?: boolean;
}) {
  return process.env.NODE_ENV === 'production'
    ? { type: 'decimal', precision, scale, nullable }
    : { type: 'text', nullable };
}

export function JsonColumnType({ nullable = false }: { nullable?: boolean }) {
  return process.env.NODE_ENV === 'production'
    ? { type: 'json', nullable }
    : { type: 'text', nullable };
}

export function ArrayColumnType({ nullable = false }: { nullable?: boolean }) {
  return process.env.NODE_ENV === 'production'
    ? { type: 'text', array: true, nullable }
    : { type: 'text', nullable };
}
