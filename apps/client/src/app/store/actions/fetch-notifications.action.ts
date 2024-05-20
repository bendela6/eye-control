import { createAsyncThunk } from '@reduxjs/toolkit';
import { notificationsApi } from '../../services';
import { store } from '../store';
import { setNotificationsAction } from '../slices';

export const fetchNotificationsAction = createAsyncThunk(
  `Fetch Notifications`,
  async () => {
    const { data } = await notificationsApi.fetch();
    store.dispatch(setNotificationsAction(data));
  }
);
