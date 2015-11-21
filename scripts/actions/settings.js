import * as NotificationsActions from "./notifications";

export const SETTINGS_LOADED = "SETTINGS_LOADED";
export const SETTINGS_SAVED = "SETTINGS_SAVE";

export function loadSettings() {
  return dispatch => {
    const jsonSettings = localStorage.getItem("kwac_settings");
    const settings = jsonSettings ? JSON.parse(jsonSettings) : {};
    dispatch({type: SETTINGS_LOADED, settings});
  };
}

export function saveSettings(settings) {
  return dispatch => {
    const jsonSettings = JSON.stringify(settings);
    localStorage.setItem("kwac_settings", jsonSettings);
    dispatch(NotificationsActions.notifyInfo("Settings saved."));
    dispatch({type: SETTINGS_SAVED, settings});
  };
}
