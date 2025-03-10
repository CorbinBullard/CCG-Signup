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
import { FieldType } from '../fieldTypes';
import { BadRequestException } from '@nestjs/common';
import { Options } from '../Options';
import { Response } from 'src/response/response.entity';

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

  @OneToMany(() => Response, (response) => response.field)
  responses: Response[];

  @BeforeInsert()
  @BeforeUpdate()
  validateOptions() {
    if (
      this.type === FieldType.select &&
      (!this.options || this.options.length === 0)
    ) {
      throw new BadRequestException('Select fields must have options');
    }
  }
}
