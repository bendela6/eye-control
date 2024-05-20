import { Middleware } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { environment } from '../../../environment';
import { store } from '../store';
import { fetchNotificationsAction } from '../actions';
import {
  addNotificationAction,
  setNotificationsSocketStatusAction,
  SocketStatus,
} from '../slices';
import { EcNotification } from '@types';

const updateSocketStatus = (status: SocketStatus) => {
  store.dispatch(setNotificationsSocketStatusAction(status));
};

const receiveNotification = (payload: EcNotification) => {
  store.dispatch(addNotificationAction(payload));
};

export const notificationMiddleware: Middleware = () => {
  const socket = io(environment.socketUrl, {});
  socket.connect();

  socket.onAnyOutgoing((eventName, ...args) => {
    console.log('SOCKET EVENT:', eventName, args);
  });

  socket.on('connect', () => {
    store.dispatch(fetchNotificationsAction());
    updateSocketStatus(SocketStatus.CONNECTED);
  });

  socket.on('disconnect', () => {
    updateSocketStatus(SocketStatus.DISCONNECTED);
  });

  socket.on('connect_error', () => {
    updateSocketStatus(SocketStatus.CONNECT_ERROR);
  });

  socket.on('notification', (payload) => {
    receiveNotification(payload);
  });

  return (next) => (action) => next(action);
};
