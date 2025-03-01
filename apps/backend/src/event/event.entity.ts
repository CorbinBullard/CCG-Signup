import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Form } from 'src/form/form.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('string')
  title: string;

  @Column('string')
  description: string;

  @Column('date')
  date: Date;

  @Column('string')
  image: string;

  @OneToOne(() => Form, (form) => form.event)
  form: Form;
}
