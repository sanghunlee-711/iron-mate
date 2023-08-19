'use client';

import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Button from '../../components/buttons/Button';
import EnterInformationTable from '../../components/table/EnterInformationTable';
import Timer from '../../components/Timer';
import { BASE_TABLE_FORM } from '../../constants/table';
import { ITrain, TableForm } from '../types/table';
import { Excel } from '../../utils/excel';
import DateInput from '../../components/input/DateInput';
import { useParams, useRouter } from 'next/navigation';
import { pushDateFormat } from '@/app/utils/format';

const Train = () => {
  const { date: dateParams } = useParams();
  const route = useRouter();
  const [calendarDate, setCalendarDate] = useState<string>('');
  const { handleSubmit, register, control } = useForm<TableForm>({
    defaultValues: {
      trainTable: [BASE_TABLE_FORM],
    },
  });

  const { fields, append, prepend, remove, swap } = useFieldArray({
    control,
    name: 'trainTable',
  });

  const handleAddButton = () => {
    append(BASE_TABLE_FORM);
  };

  const removeListWithId = (index: number) => {
    const isOverOneTable = fields.length > 1;

    if (!isOverOneTable) return;

    remove(index);
  };

  const onSubmit = (data: TableForm) => {
    const excel = new Excel<typeof data.trainTable>(data.trainTable);
    excel.makeFromData();
  };

  const handleDate = (date: Date) => {
    //*Todo: 이건 방식을 조금 더 고민해보자.
    route.replace(`/train/${pushDateFormat(date)}`);
  };

  useEffect(() => {
    const today = new Date();

    if (dateParams) return setCalendarDate(dateParams as string);

    route.replace(`/train/${pushDateFormat(today)}`);
  }, [dateParams]);

  return (
    <>
      <div className="flex justify-between align-middle">
        <DateInput handleDate={handleDate} date={calendarDate} />
        <Button type="submit" className="fixed">
          저장하기
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-end">
          <div onClick={handleAddButton}>+</div>
        </div>
        <ul className="bg-white mt-3 flex flex-col justify-center align-middle">
          {fields.map(({ id }, index) => (
            <li
              key={id}
              className="border border-slate-300 p-3 rounded-md mb-3"
            >
              <div className="flex justify-between align-middle">
                <div>
                  <Timer
                    endCallback={() =>
                      console.log('add sets when finishing every runtime?')
                    }
                  />
                </div>
                <div
                  className="rounded-full	border inline-flex items-center justify-center w-6 h-6"
                  onClick={() => removeListWithId(index)}
                >
                  x
                </div>
              </div>
              <EnterInformationTable
                register={register}
                identifier={index + ''}
              />
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};

export default Train;
