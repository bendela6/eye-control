export function getEnv<T extends string>(name: string, defaultValue: T): T {
  const value = process.env[name];
  return value !== undefined ? (value as T) : defaultValue;
}
