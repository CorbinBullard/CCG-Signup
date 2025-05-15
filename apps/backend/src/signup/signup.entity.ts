import { Event } from 'src/event/event.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Response } from 'src/response/entities/response.entity';

@Entity()
export class Signup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => Event, (event) => event.signups, {
    onDelete: 'CASCADE',
  })
  event: Event;

  @OneToMany(() => Response, (response) => response.signup, {
    cascade: true,
    eager: true,
  })
  responses: Response[];
}
