import { STORAGE } from '../constants/message';
import { IAlert } from '../interface/alert';
import CustomAlert from '../utils/alert';

class DataStorage {
  customAlert: IAlert;

  constructor(alertInstance: IAlert = new CustomAlert()) {
    this.customAlert = alertInstance;
  }

  set(key: string = 'iron-mate-data', data: any) {
    try {
      if (!data || !key) throw new Error(STORAGE.INCORRECT_DATA);

      global?.window?.localStorage.setItem(key, JSON.stringify(data));
      this.customAlert.toast(STORAGE.SAVE_SUCCESS);
    } catch (e) {
      const error = e as Error;
      this.customAlert.toast(error.message || STORAGE.SAVE_FAILURE);
      console.error(e);
    }
  }

  get(key: string = 'iron-mate-data') {
    try {
      const keyData = global?.window?.localStorage.getItem(key) || '';

      if (!keyData) return null;

      const data = JSON.parse(keyData as string);
      return data;
    } catch (e) {
      this.customAlert.toast(STORAGE.GET_FAILURE);
      console.error(e);
    }
  }

  remove(key: string = 'iron-mate-data') {
    try {
      global?.window?.localStorage.removeItem(key);
      this.customAlert.toast(STORAGE.REMOVE_SUCCESS);
    } catch (e) {
      this.customAlert.toast(STORAGE.REMOVE_FAILURE);
      console.error(e);
    }
  }
}

export default DataStorage;
