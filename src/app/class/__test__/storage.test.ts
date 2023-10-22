import { STORAGE } from '@/app/constants/message';
import CustomAlert from '@/app/utils/alert';
import DataStorage from '../storage';

class MockJSON {
  originStringify = JSON.stringify;
  originParse = JSON.parse;

  mockStringify(mockValue: any) {
    JSON.stringify = mockValue;
  }

  mockParse(mockValue: any) {
    JSON.parse = mockValue;
  }

  clearMock() {
    JSON.stringify = this.originStringify;
    JSON.parse = this.originParse;
  }
}

const MOCK = {
  DATA: {
    KEY: 'test-key',
    VALUE: 'test-value',
  },
};

describe('DataStorage클래스 테스트', () => {
  const setup = () => {
    const customAlert = new CustomAlert();
    const dataStorage = new DataStorage(customAlert);
    const mockJSON = new MockJSON();

    jest.spyOn(customAlert, 'toast');

    return {
      dataStorage,
      customAlert,
      mockJSON,
    };
  };

  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('set > 데이터 저장', () => {
    it('올바르지 않은 데이터 형태의 경우 alert를 발생시켜야 한다.', () => {
      const { dataStorage, customAlert } = setup();
      dataStorage.set(MOCK.DATA.KEY, null);

      expect(customAlert.toast).toHaveBeenCalledWith(STORAGE.INCORRECT_DATA);
    });

    it('알 수 없는 이유로 데이터 저장에 실패한 경우 alert를 발생시켜야 한다.', () => {
      const { dataStorage, customAlert, mockJSON } = setup();

      mockJSON.mockStringify(
        jest.fn(() => {
          throw new Error();
        })
      );

      dataStorage.set(MOCK.DATA.KEY, MOCK.DATA.VALUE);
      expect(customAlert.toast).toHaveBeenCalledWith(STORAGE.SAVE_FAILURE);
      mockJSON.clearMock();
    });

    it('데이터 저장에 성공한 경우 alert를 발생시켜야 한다.', () => {
      const { dataStorage, customAlert } = setup();

      dataStorage.set(MOCK.DATA.KEY, MOCK.DATA.VALUE);

      expect(customAlert.toast).toHaveBeenCalledWith(STORAGE.SAVE_SUCCESS);
    });
  });

  describe('get > 데이터 가져오기', () => {
    it('key에 해당하는 데이터가 없는 경우 null을 반환해준다.', () => {
      const { dataStorage } = setup();

      expect(dataStorage.get(MOCK.DATA.KEY)).toBeNull();
    });

    it('key에 해당하는 데이터가 있는 경우 값을 반환해준다.', () => {
      const { dataStorage } = setup();

      dataStorage.set(MOCK.DATA.KEY, MOCK.DATA.VALUE);
      expect(dataStorage.get(MOCK.DATA.KEY)).toBe(MOCK.DATA.VALUE);
    });

    it('알 수 없는 이유로 데이터 가져오기에 실패한 경우 alert를 발생시켜야 한다.', () => {
      const { dataStorage, customAlert, mockJSON } = setup();

      mockJSON.mockParse(
        jest.fn(() => {
          throw new Error();
        })
      );

      dataStorage.set(MOCK.DATA.KEY, MOCK.DATA.VALUE);
      dataStorage.get(MOCK.DATA.KEY);

      expect(customAlert.toast).toHaveBeenCalledWith(STORAGE.GET_FAILURE);
      mockJSON.clearMock();
    });
  });

  describe('remove > 데이터 삭제', () => {
    it('데이터 삭제 완료 후 alert를 발생시킨다.', () => {
      const { dataStorage, customAlert } = setup();

      dataStorage.set(MOCK.DATA.KEY, MOCK.DATA.VALUE);
      dataStorage.remove(MOCK.DATA.KEY);

      expect(customAlert.toast).toHaveBeenCalledWith(STORAGE.REMOVE_SUCCESS);
    });
  });
});
