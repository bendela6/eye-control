import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { environment } from './environment';

(async function () {
  const pubClient = createClient({
    url: `redis://${environment.redis.host}:${environment.redis.port}`,
  });
  const subClient = pubClient.duplicate();

  await Promise.all([
    pubClient.connect(), //
    subClient.connect(),
  ]);

  const io = new Server({
    adapter: createAdapter(pubClient, subClient),
    cors: { origin: '*' },
  });

  const port = environment.port;
  io.listen(port);
  console.log(`Socket.io listening on port ${port}`);
})();
