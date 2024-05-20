import { useState } from 'react';
import { EcNotificationForm, EcNotificationType } from '@types';
import { notificationsApi } from '../../services';
import { capitalize } from '@utils';
import { Switch, SwitchOption } from '../switch/switch';

const notificationTypeOptions = Object.values(EcNotificationType).map(
  (type) =>
    ({
      key: type,
      value: type,
      label: capitalize(type.toLowerCase()),
      className: `btn btn-${type.toLowerCase()}`,
    } satisfies SwitchOption)
);

const defaultNotificationForm: EcNotificationForm = {
  type: EcNotificationType.INFO,
  message: '',
};

export function NotificationForm() {
  const [notificationForm, setNotificationForm] = useState<EcNotificationForm>({
    ...defaultNotificationForm,
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setNotificationForm({
      ...defaultNotificationForm,
    });
  };

  const sendNotification = (formData: EcNotificationForm) => {
    setLoading(true);
    notificationsApi.send(formData).then(() => {
      setLoading(false);
      resetForm();
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!notificationForm.type || !notificationForm.message) {
          return;
        }
        sendNotification(notificationForm);
      }}
    >
      <fieldset disabled={loading}>
        <div className="card card-primary">
          <div className="card-heading">
            <h2>Send Notification</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Type:</label>
              <Switch
                disabled={loading}
                options={notificationTypeOptions}
                value={notificationForm.type}
                onChange={(type) => {
                  console.log('type', type);
                  setNotificationForm((formData) => ({
                    ...formData,
                    type,
                  }));
                }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message:</label>
              <textarea
                disabled={loading}
                className="form-control"
                value={notificationForm.message}
                onChange={(e) => {
                  setNotificationForm((formData) => ({
                    ...formData,
                    message: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="card-footer flex items-center justify-end gap-x-3">
            <button
              onClick={resetForm}
              type="reset"
              className="btn btn-secondary"
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
