import { environment } from '../../environment';

export const notificationsApi = {
  async fetch() {
    return fetch(`${environment.apiUrl}/api/notifications`).then((res) =>
      res.json()
    );
  },
};
