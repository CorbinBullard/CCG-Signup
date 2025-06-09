import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, unique: true })
  hardwareId: string; // e.g. device unique ID from RN

  @Column({ nullable: true, unique: true })
  uniqueKey?: string;

  @Column({ nullable: true })
  oneTimeToken?: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
