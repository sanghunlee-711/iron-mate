import CustomAlert from '../utils/alert';

class DataStorage {
  customAlert;

  constructor() {
    this.customAlert = new CustomAlert();
  }

  set(key: string = 'iron-mate-data', data: any) {
    try {
      if (!data) return;
      global?.window?.localStorage.setItem(key, JSON.stringify(data));
      this.customAlert.toast('브라우저 내 데이터 저장이 완료되었습니다.');
    } catch (e) {
      this.customAlert.toast('브라우저 내 데이터 저장에 실패하였습니다.');
      console.error(e);
    }
  }

  get(key: string = 'iron-mate-data') {
    try {
      const keyData = global?.window?.localStorage.getItem(key) || '';

      if (!keyData) return;

      const data = JSON.parse(keyData as string);
      return data;
    } catch (e) {
      this.customAlert.toast('브라우저 내 데이터 가져오기에 실패하였습니다.');
      console.error(e);
    }
  }

  remove(key: string = 'iron-mate-data') {
    try {
      const data = global?.window?.localStorage.removeItem(key);
      return data;
    } catch (e) {
      this.customAlert.toast('브라우저 내 데이터 삭제하기에 실패하였습니다.');
      console.error(e);
    }
  }
}

export default DataStorage;
