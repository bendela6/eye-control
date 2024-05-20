import { configureStore } from '@reduxjs/toolkit';
import { notificationsSlice } from './slices';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { notificationMiddleware } from './middlewares';

export const store = configureStore({
  reducer: {
    notifications: notificationsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(notificationMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
