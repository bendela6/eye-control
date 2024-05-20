import { Emitter } from '@socket.io/redis-emitter';
import { EcNotificationForm } from '@types';
import { dataSource, redisClient } from '../connections';
import { NotificationEntity } from '../entities';

const notificationRepo = dataSource.getRepository(NotificationEntity);

export const notificationsService = {
  async find() {
    return await notificationRepo.find({
      order: { createdAt: 'DESC' },
      take: 10,
    });
  },

  async clear() {
    await notificationRepo.clear();
  },

  async send(formData: EcNotificationForm) {
    const io = new Emitter(redisClient);

    const notificationEntity = new NotificationEntity();
    notificationEntity.type = formData.type;
    notificationEntity.message = formData.message;

    await notificationRepo.save(notificationEntity);

    console.log(
      `Sending notification: ${notificationEntity.type} - ${notificationEntity.message}`
    );
    io.emit('notification', notificationEntity);
  },
};
