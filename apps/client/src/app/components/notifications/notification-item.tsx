import classnames from 'classnames';
import { EcNotification } from '@types';
import { useMemo } from 'react';
import { format } from 'date-fns';

interface Props {
  notification: EcNotification;
}

export function NotificationItem(props: Props) {
  const { notification } = props;

  const date = useMemo(
    () => format(new Date(notification.createdAt), 'MMM do, yyyy'),
    [notification.createdAt]
  );

  const time = useMemo(
    () => format(new Date(notification.createdAt), 'HH:mm'),
    [notification.createdAt]
  );

  return (
    <div
      className={classnames(
        `notification notification-${notification.type.toLowerCase()}`
      )}
    >
      <div className="flex items-center justify-between">
        <div>{notification.message}</div>
        <div className="flex flex-column items-end">
          <div className="text-grey-500 mb-2">{date}</div>
          <div className="text-grey-500">{time}</div>
        </div>
      </div>
    </div>
  );
}
