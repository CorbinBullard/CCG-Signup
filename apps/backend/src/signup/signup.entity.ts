import { Event } from 'src/event/event.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Response } from 'src/response/response.entity';

@Entity()
export class Signup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  note: string;

  @ManyToOne(() => Event, (event) => event.signups)
  event: Event;

  @OneToMany(() => Response, (response) => response.signup)
  response: Response[];
}
