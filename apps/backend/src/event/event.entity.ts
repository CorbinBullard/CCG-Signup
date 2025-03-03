import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Form } from 'src/form/form.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column('date')
  date: Date;

  @Column()
  image: string;

  @Column()
  cost: number;

  @ManyToOne(() => Form, (form) => form.event, { cascade: true })
  form: Form;
}
