import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Form } from 'src/form/form.entity';
import { FieldTypeEnum } from '../fieldTypeEnums';
import { BadRequestException } from '@nestjs/common';
import { Options } from '../Options';
import { Response } from 'src/response/entities/response.entity';
import { Subfield } from '../Subfield';
import { EnumColumnType } from 'src/typeorm.config/ColumnConfig';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column(EnumColumnType({ enumType: FieldTypeEnum }))
  type: FieldTypeEnum;

  @Column({ default: true })
  required: boolean;

  @Column({ nullable: true })
  description?: string;

  @Column('json', { nullable: true })
  options?: Options[];

  @Column('json', { nullable: true })
  subfields?: Subfield[];

  @Column({ nullable: true })
  cost?: number;

  @ManyToOne(() => Form, (form) => form.fields, {
    onDelete: 'CASCADE',
  })
  form: Form;

  @OneToMany(() => Response, (response) => response.field)
  responses: Response[];

  @BeforeInsert()
  @BeforeUpdate()
  validateOptions() {
    if (
      this.type === FieldTypeEnum.select &&
      (!this.options || this.options.length === 0)
    ) {
      throw new BadRequestException('Select fields must have options');
    }
  }
}
