import { FieldType } from 'src/Types/fields/FieldType';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FormTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('json')
  fields: FieldType[];
}
