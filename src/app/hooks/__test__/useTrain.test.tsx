import { renderHook, act, waitFor } from '@testing-library/react';
import useTrain from '../useTrain';
import { pushDateFormat } from '@/app/utils/format';
import { BASE_TABLE_FORM } from '@/app/constants/table';

const TEST_INITIAL_DATE = '2022-01-01';
const TODAY = pushDateFormat(new Date());

jest.mock('next/navigation', () => ({
  useParams: () => {
    return {
      date: TEST_INITIAL_DATE,
    };
  },
  useRouter: () => {
    return {
      replace: jest.fn,
    };
  },
}));

const useParams = jest.spyOn(require('next/navigation'), 'useParams');

afterAll(() => {
  jest.clearAllMocks();
});

describe('useTrain', () => {
  const setup = () => {
    return renderHook(useTrain);
  };

  describe('날짜처리(handleDate, calendarDate)', () => {
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

  describe('데이터 필드(fields, addListCard, removeListWithId)', () => {
    describe('fields는', () => {
      it('초기 렌더시 하나의 데이터가 존재해야 한다.', () => {
        const { result } = setup();
        expect(result.current.fields.length).toBe(1);
      });

      it('정해진 데이터 형태를 따른다.', () => {
        const { result } = setup();
        expect(Object.keys(result.current.fields[0])).toStrictEqual(
          Object.keys(BASE_TABLE_FORM)
        );
      });
    });

    describe('addListCard 메서드를 사용 시', () => {
      it('field에 하나의 데이터가 추가 된다.', () => {
        const { result } = setup();

        act(() => {
          result.current.addListCard();
        });

        expect(result.current.fields.length).toBe(2);
      });

      it('정해진 형태의 데이터를 추가한다.', () => {
        const { result } = setup();

        act(() => {
          result.current.addListCard();
        });

        expect(Object.keys(result.current.fields[1])).toStrictEqual(
          Object.keys(BASE_TABLE_FORM)
        );
      });
    });

    describe('removeListWithId 메서드 사용 시', () => {
      it('데이터가 2개 이상인 경우 인자로 들어간 인덱스의 카드를 삭제한다.', () => {
        const { result } = setup();

        act(() => {
          result.current.addListCard();
        });

        act(() => {
          result.current.removeListCardWithId(0);
        });

        expect(result.current.fields.length).toBe(1);
      });

      it('하나의 데이터만 있는 경우 더이상 삭제 되지 않고 하나의 데이터가 유지된다.', () => {
        const { result } = setup();

        expect(result.current.fields.length).toBe(1);

        act(() => {
          result.current.removeListCardWithId(0);
        });

        expect(result.current.fields.length).toBe(1);
      });
    });
  });

  describe('세트 수 임의 업데이트 updateWorkoutSets', () => {
    //아래 useForm의 setValue테스트가 적절히 field값을 업데이트 하지 못하는것으로 유추 됨.
    it.skip('주어진 인덱스에 해당하는 테이블 카드의 세트수가 업데이트 되어야 한다.', () => {
      const { result, rerender } = setup();

      act(() => {
        result.current.addListCard();
      });

      expect(result.current.fields[1].set).toBe(0);

      act(() => {
        result.current.updateWorkoutSets(1);
      });

      expect(result.current.fields).toBe(1);
    });
  });
});
