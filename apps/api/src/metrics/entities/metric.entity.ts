import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Metric {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ type: 'decimal' })
  value: number

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  timestamp: Date
}
