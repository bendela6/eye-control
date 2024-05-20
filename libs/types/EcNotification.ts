export enum EcNotificationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export type EcNotification = {
  id: string;
  type: EcNotificationType;
  message: string;
  createdAt: string;
};

export type EcNotificationForm = Pick<EcNotification, 'type' | 'message'>;
