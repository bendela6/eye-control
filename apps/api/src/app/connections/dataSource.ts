import { DataSource } from 'typeorm';
import { NotificationEntity } from '../entities';
import { environment } from '../../environment';

export const dataSource = new DataSource({
  synchronize: true,
  type: environment.database.type,
  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.username,
  password: environment.database.password,
  database: environment.database.database,
  entities: [
    NotificationEntity, //
  ],
});
