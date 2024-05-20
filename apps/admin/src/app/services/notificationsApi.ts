import { EcNotificationForm } from '@types';
import { environment } from '../../environment';

export const notificationsApi = {
  send(data: EcNotificationForm) {
    return fetch(`${environment.apiUrl}/api/notifications`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
