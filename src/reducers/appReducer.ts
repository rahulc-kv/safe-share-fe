import { createSlice, current } from '@reduxjs/toolkit';

// import { JOB_NOTIFIER } from 'constants/common';
// import { ClientProfileDetails } from '@containers/tax-professional-dashboard/client-listing/types';
import { ShowNotifierPayloadType } from './types';

const initialState = {
  notifications: [],
  stopJobStatusPolling: false,
  navigateTo: ''
};

export const appReducerSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // showNotifier: (state, { payload }: ShowNotifierPayloadType) => {
    //   const payloadObj = {
    //     message: payload.message,
    //     type: payload.type,
    //     autoHideDisabled: payload.autoHideDisabled || false,
    //     id: payload.id || Math.random()
    //   };
    //   let notificationsArray = [...current(state).notifications];
    //   if (notificationsArray.length > 0) {
    //     if (payloadObj.id === JOB_NOTIFIER) {
    //       const filteredNotifications = notificationsArray.filter(
    //         notification => notification.id !== JOB_NOTIFIER
    //       );
    //       state.notifications = [...filteredNotifications, payloadObj];
    //     } else {
    //       const jobNotificationIndex = notificationsArray.findIndex(
    //         notification => notification.id === JOB_NOTIFIER
    //       );
    //       if (jobNotificationIndex !== -1) {
    //         const jobNotification = notificationsArray[jobNotificationIndex];
    //         notificationsArray.splice(jobNotificationIndex, 1);
    //         state.notifications = notificationsArray.concat([
    //           payloadObj,
    //           jobNotification
    //         ]);
    //       } else state.notifications = [...notificationsArray, payloadObj];
    //     }
    //   } else {
    //     state.notifications = [payloadObj];
    //   }
    // },
    // updateNotifier: (state, { payload }: any) => {
    //   const notificationsArray = [...current(state).notifications];
    //   if (notificationsArray.length > 0) {
    //     const changeNotificationIndex = notificationsArray.findIndex(
    //       item => item.id === payload.id
    //     );
    //     if (changeNotificationIndex !== -1) {
    //       const notificationObj = notificationsArray[changeNotificationIndex];
    //       notificationsArray[changeNotificationIndex] = {
    //         ...notificationObj,
    //         ...payload
    //       };
    //     }
    //   }
    //   state.notifications = [...notificationsArray];
    // },
    // hideNotifier: (state, { payload }) => {
    //   const NotificationsArray = state.notifications.filter(
    //     item => item.id !== payload
    //   );
    //   state.notifications = [...NotificationsArray];
    // },
    // updateJobStatusPolling: (state, { payload }: { payload: boolean }) => {
    //   state.stopJobStatusPolling = payload;
    // },
    updateNavigateTo: (state, { payload }: { payload: string }) => {
      state.navigateTo = payload;
    }
  }
});

export const {
  // showNotifier,
  // updateNotifier,
  // hideNotifier,
  // updateJobStatusPolling,
  updateNavigateTo
} = appReducerSlice.actions;

export default appReducerSlice.reducer;
