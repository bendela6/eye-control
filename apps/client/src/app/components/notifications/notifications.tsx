import { NotificationItem } from './notification-item';
import {
  selectNotifications,
  selectSocketStatus,
  SocketStatus,
  useAppSelector,
} from '../../store';
import classnames from 'classnames';
import { useMemo } from 'react';

export function Notifications() {
  const notifications = useAppSelector(selectNotifications);
  const socketStatus = useAppSelector(selectSocketStatus);

  const socketStatusClassname = useMemo(() => {
    switch (socketStatus) {
      case SocketStatus.CONNECTED:
        return 'text-success';
      case SocketStatus.DISCONNECTED:
        return 'text-error';
      default:
        return 'text-grey-500';
    }
  }, [socketStatus]);

  return (
    <div className="card">
      <div className="card-heading flex justify-between items-center">
        <h1>Notifications</h1>
        <div className="flex gap-x-2">
          <div className="font-800">Socket Status:</div>
          <div className={classnames('font-800', socketStatusClassname)}>
            {socketStatus}
          </div>
        </div>
      </div>
      <div className="card-body">
        {notifications.map((notification, index) => (
          <NotificationItem key={index} notification={notification} />
        ))}
      </div>
    </div>
  );
}
