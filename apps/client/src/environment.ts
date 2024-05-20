const env = import.meta.env;

export const environment = {
  apiUrl: env['VITE_API_URL'] || 'http://localhost:9000',
  socketUrl: env['VITE_SOCKET_URL'] || 'http://localhost:9100',
};
