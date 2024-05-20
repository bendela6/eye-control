const env = import.meta.env;

export const environment = {
  apiUrl: env.VITE_API_URL || 'http://localhost:9000',
};