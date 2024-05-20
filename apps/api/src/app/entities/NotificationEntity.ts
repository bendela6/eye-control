import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum EcNotificationType {
  INFO = 'INFO',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}

@Entity({
  name: 'notifications',
})
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: EcNotificationType,
  })
  type: EcNotificationType;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}
