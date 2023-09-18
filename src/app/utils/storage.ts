import CustomAlert from './alert';

class DataStorage {
  alert;

  constructor() {
    this.alert = new CustomAlert();
  }

  set(key: string = 'iron-mate-data', data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      this.alert.toast('브라우저 내 데이터 저장이 완료되었습니다.');
    } catch (e) {
      this.alert.toast('브라우저 내 데이터 저장에 실패하였습니다.');
      console.error(e);
    }
  }
  get(key: string = 'iron-mate-data') {
    try {
      const data = JSON.parse(localStorage.getItem(key) as string);
      return data;
    } catch (e) {
      this.alert.toast('브라우저 내 데이터 가져오기에 실패하였습니다.');
      console.error(e);
    }
  }
  remove(key: string = 'iron-mate-data') {
    try {
      const data = localStorage.removeItem(key);
      return data;
    } catch (e) {
      this.alert.toast('브라우저 내 데이터 삭제하기에 실패하였습니다.');
      console.error(e);
    }
  }
}
export default DataStorage;
