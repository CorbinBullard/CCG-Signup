import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Form } from '../form/form.entity';
import { FieldType } from './fieldTypes';
import { BadRequestException } from '@nestjs/common';
import { Options } from './Options';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  type: FieldType;

  @Column()
  required: boolean;

  @Column({ nullable: true })
  description?: string;

  @Column('json', { nullable: true })
  options?: Options[];

  @ManyToOne(() => Form, (form) => form.fields)
  form: Form;

  @BeforeInsert()
  @BeforeUpdate()
  validateOptions() {
    console.log(this);
    if (
      this.type === FieldType.select &&
      (!this.options || this.options.length === 0)
    ) {
      throw new BadRequestException('Select fields must have options');
    }
  }
}
