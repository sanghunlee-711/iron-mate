import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { BASE_TABLE_FORM } from '../constants/table';
import { ITrain, TableForm, TTrainData } from '../train/types/table';
import { formatSaveDate, pushDateFormat } from '../utils/format';
import DataStorage from '../utils/storage';
import { checkPossibilityToSave } from '../utils/validate';

const useTrain = () => {
  const { date: dateParams } = useParams();
  const route = useRouter();
  const [calendarDate, setCalendarDate] = useState<string>('');
  const { handleSubmit, register, control, setValue, getValues } =
    useForm<TableForm>({
      defaultValues: {
        trainTable: [BASE_TABLE_FORM],
      },
    });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'trainTable',
  });

  const dataStorage = new DataStorage();

  const addListCard = () => {
    append(BASE_TABLE_FORM);
  };

  const removeListCardWithId = (index: number) => {
    const isOverOneTable = fields.length > 1;

    if (!isOverOneTable) return alert('마지막 카드 입니다!');

    remove(index);
  };

  const onSave = (data: TableForm) => {
    const currentCards = [...data?.trainTable];

    //*Todo: id 업데이트 및 삭제 부분은 추후 다시 한번 고려해보자
    currentCards.forEach((el) => delete el['id']);

    if (!checkPossibilityToSave(currentCards))
      return alert(
        '적절하지 않은 데이터 형태입니다. \n(타겟부위, 종목이름, 중량 > 0, 횟수 > 0, 세트 > 0를 모두 기재해주세요)'
      );

    const originData = dataStorage.get('iron-mate-data') as TTrainData[];

    if (!originData) {
      // 이게 뭐람;
      return dataStorage.set('iron-mate-data', [
        { date: formatSaveDate(new Date()), data: currentCards },
      ]);
    }

    let isExistDayBefore = false;
    const updateData = originData.reduce((acc, curr, currIdx, originArr) => {
      const isTodayData = curr.date === (dateParams as string);
      //아래 변수는 정렬하면 없앨 수 있을 듯.
      const isIncludeTodayData = acc.map((el) => el.date).includes(curr.date);

      if (isTodayData && !isIncludeTodayData) {
        isExistDayBefore = true;
        acc.splice(currIdx, 1);
        acc.push({ date: curr.date, data: currentCards });
        return acc;
      }

      acc.push(curr);
      return acc;
    }, [] as TTrainData[]);

    const saveData = isExistDayBefore
      ? updateData
      : [...updateData, { date: dateParams, data: currentCards }];

    return dataStorage.set('iron-mate-data', saveData);
  };

  const updateTableValue = (itemIndex: number, type: keyof ITrain) => {
    if (fields.length - 1 < itemIndex) return;

    const uniqueId = `trainTable.${Number(itemIndex)}.${type}` as const;
    const currentSet = getValues(uniqueId) as unknown as string;

    setValue(uniqueId, (Number(currentSet) + 1) as never);
  };

  const updateWorkoutSets = (itemIndex: number) => {
    //*TODO: itemIndex가 전체 인덱스 범위에 없는 경우 에러처리 필요.
    // if (fields.length - 1 < itemIndex) return;

    const uniqueId = `trainTable.${Number(itemIndex)}.set` as const;
    const currentSet = getValues(uniqueId) as unknown as string;

    setValue(uniqueId, (Number(currentSet) + 1) as never);
  };

  const handleDate = (date: Date) => {
    //*Todo: 이건 방식을 조금 더 고민해보자.
    route.replace(`/train/${pushDateFormat(date)}`);
  };

  const updateInitialData = () => {
    const storageData = dataStorage.get('iron-mate-data') as TTrainData[];

    if (!storageData) return;

    const filterData = storageData?.filter((el) => dateParams === el.date)?.[0];

    filterData?.data?.forEach((el, index) => update(index, el));
  };

  useEffect(() => {
    const today = new Date();

    if (dateParams) return setCalendarDate(dateParams as string);
    setCalendarDate(pushDateFormat(today));
    // route.replace(`/train/${pushDateFormat(today)}`);
  }, [dateParams]);

  useEffect(() => {
    updateInitialData();
  }, []);

  return {
    fields,
    register,
    calendarDate,
    handleDate,
    addListCard,
    removeListCardWithId,
    updateWorkoutSets,
    handleSubmit,
    onSave,
  };
};

export default useTrain;
