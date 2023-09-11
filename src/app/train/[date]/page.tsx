'use client';

import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Button from '../../components/buttons/Button';
import EnterInformationTable from '../../components/table/EnterInformationTable';
import Timer from '../../components/Timer';
import { BASE_TABLE_FORM } from '../../constants/table';
import { ITrain, TableForm, TTrainData } from '../types/table';
import DateInput from '../../components/input/DateInput';
import { useParams, useRouter } from 'next/navigation';
import { formatSaveDate, pushDateFormat } from '@/app/utils/format';
import DataStorage from '@/app/utils/storage';
import { checkPossibilityToSave } from '@/app/utils/validate';

const Train = () => {
  const { date: dateParams } = useParams();
  const route = useRouter();
  const [calendarDate, setCalendarDate] = useState<string>('');
  const { handleSubmit, register, control, setValue, getValues } =
    useForm<TableForm>({
      defaultValues: {
        trainTable: [BASE_TABLE_FORM],
      },
    });

  const { fields, append, prepend, remove, swap, update } = useFieldArray({
    control,
    name: 'trainTable',
  });

  const dataStorage = new DataStorage();

  const handleAddButton = () => {
    append(BASE_TABLE_FORM);
  };

  const removeListWithId = (index: number) => {
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

  const updateWorkoutSets = (itemIndex: number) => {
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

    route.replace(`/train/${pushDateFormat(today)}`);
  }, [dateParams]);

  useEffect(() => {
    updateInitialData();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSave)}>
        <div className="flex justify-between align-middle">
          <DateInput handleDate={handleDate} date={calendarDate} />
          <Button type="submit" className="fixed">
            저장하기
          </Button>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleAddButton} type="button" size="s" isBorder>
            +
          </Button>
        </div>
        <ul className="bg-white mt-3 flex flex-col justify-center align-middle">
          {fields.map(({ id }, index) => {
            return (
              <li
                key={id}
                className="border border-slate-300 p-3 rounded-md mb-3"
              >
                <div className="flex justify-between align-middle">
                  <Timer
                    startCallback={() => console.log('광고 시작')}
                    endCallback={() => updateWorkoutSets(index)}
                  />

                  <Button
                    className="rounded-full	border inline-flex items-center justify-center w-6 h-6"
                    onClick={() => removeListWithId(index)}
                    type="button"
                    size="s"
                    isBorder
                  >
                    x
                  </Button>
                </div>
                <EnterInformationTable
                  register={register}
                  identifier={index + ''}
                />
              </li>
            );
          })}
        </ul>
      </form>
    </>
  );
};

export default Train;
