import { renderHook, act } from '@testing-library/react';
import useTrain from '../useTrain';
import { pushDateFormat } from '@/app/utils/format';

const TEST_INITIAL_DATE = '2022-01-01';
const TODAY = pushDateFormat(new Date());

jest.mock('next/navigation', () => ({
  useParams: () => {
    return {
      date: TEST_INITIAL_DATE,
    };
  },
}));

jest.mock('next/router', () => ({
  useRouter: () => {
    return {
      replace: jest.fn,
    };
  },
}));

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const useParams = jest.spyOn(require('next/navigation'), 'useParams');

describe('useTrain', () => {
  const setup = () => {
    return renderHook(useTrain);
  };

  describe('handleDate', () => {
    it('urlSeachParams를 통해 받은 날짜가 초기 날짜로 렌더 되어야한다.', () => {
      const { result } = setup();
      useParams.mockReturnValue(() => {
        return {
          date: TEST_INITIAL_DATE,
        };
      });
      expect(result.current.calendarDate).toBe(TEST_INITIAL_DATE);
    });

    it('urlSeachParams 값이 없는 경우 오늘 날짜가 초기 날짜가 된다.', () => {
      const { result } = setup();
      useParams.mockReturnValue(() => {
        return {
          date: null,
        };
      });

      expect(result.current.calendarDate).toBe(TODAY);
    });
  });
});
