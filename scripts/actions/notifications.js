export const NOTIFICATION_ADDED = "NOTIFICATION_ADDED";
export const NOTIFICATION_REMOVED = "NOTIFICATION_REMOVED";
export const NOTIFICATION_CLEAR = "NOTIFICATION_CLEAR";

function notify(type, message) {
  return {
    type: NOTIFICATION_ADDED,
    notification: {
      type,
      message,
      time: new Date().getTime(),
    },
  };
}

export function notifyInfo(message) {
  return notify("info", message);
}

export function notifyError(error) {
  return notify("error", error.message);
}

export function removeNotification(index) {
  return {
    type: NOTIFICATION_REMOVED,
    index,
  };
}

export function clearNotifications() {
  return {
    type: NOTIFICATION_CLEAR,
  };
}
