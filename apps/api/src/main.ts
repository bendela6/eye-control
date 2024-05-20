import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { notificationsService } from './app/services';
import { dataSource, redisClient } from './app/connections';
import { environment } from './environment';

const { host, port } = environment;

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/notifications', async (req, res) => {
  const data = await notificationsService.find();
  res.status(200).send({ data });
});

app.get('/api/notifications/clear', async (req, res) => {
  await notificationsService.clear();
  res.status(200).send();
});

app.post('/api/notifications', async (req, res) => {
  const { type, message } = req.body;
  await notificationsService.send({ type, message });
  res.status(200).send();
});

const connectWithRetry = async <T>(
  name: string,
  connect: () => Promise<T>,
  maxRetries = 1000,
  retryDelay = 1000
): Promise<T> => {
  let retryCount = 0;

  while (retryCount < maxRetries) {
    try {
      return await connect();
    } catch (error) {
      retryCount++;
      console.log(
        `Failed to connect to ${name} (attempt ${retryCount}/${maxRetries}). Retrying in ${retryDelay}ms...`
      );
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }

  throw new Error(`Failed to connect to ${name} after ${maxRetries} attempts.`);
};

(async () => {
  await Promise.all([
    connectWithRetry('Database', () => dataSource.initialize()),
    connectWithRetry('Redis', () => redisClient.connect()),
  ]);
  app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
})();
