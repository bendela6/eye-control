import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectNotifications = createSelector(
  [(state: RootState) => state.notifications],
  (notifications) => {
    return notifications.data;
  }
);
