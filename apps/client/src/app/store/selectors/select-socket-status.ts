import { RootState } from '../store';
import { createSelector } from '@reduxjs/toolkit';

export const selectSocketStatus = createSelector(
  [(state: RootState) => state.notifications],
  (notifications) => {
    return notifications.socketStatus;
  }
);
