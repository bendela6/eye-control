import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EcNotification } from '@types';

export enum SocketStatus {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  CONNECT_ERROR = 'CONNECT_ERROR',
  RECONNECTING = 'RECONNECTING',
}

interface NotificationsSlice {
  socketStatus?: SocketStatus;
  ids: string[];
  data: EcNotification[];
}

const initialState: NotificationsSlice = {
  socketStatus: undefined,
  ids: [],
  data: [],
};

export const notificationsSlice = createSlice({
  name: 'Notifications',
  initialState,
  reducers: {
    setNotificationsSocketStatusAction: (
      state,
      action: PayloadAction<SocketStatus>
    ) => {
      state.socketStatus = action.payload;
    },
    setNotificationsAction: (
      state,
      action: PayloadAction<EcNotification[]>
    ) => {
      state.data = action.payload;
      state.ids = action.payload.map((n) => n.id);
    },
    addNotificationAction: (state, action: PayloadAction<EcNotification>) => {
      // check if the notification is already in the list
      if (state.ids.includes(action.payload.id)) {
        return;
      }
      state.data = [action.payload, ...state.data]
        .slice(0, 50)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      state.ids = state.data.map((n) => n.id);
    },
  },
});

export const {
  setNotificationsAction, //
  setNotificationsSocketStatusAction,
  addNotificationAction,
} = notificationsSlice.actions;
