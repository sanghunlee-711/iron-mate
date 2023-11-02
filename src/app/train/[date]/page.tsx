'use client';

import React from 'react';
import Button from '../../components/buttons/Button';
import EnterInformationTable from '../../components/table/EnterInformationTable';
import Timer from '../../components/Timer';
import DateInput from '../../components/input/DateInput';
import useTrain from '@/app/hooks/useTrain';

const Train = () => {
  const {
    fields,
    register,
    calendarDate,
    handleDate,
    addListCard,
    removeListCardWithId,
    updateWorkoutSets,
    handleSubmit,
    onSave,
  } = useTrain();

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
          <Button onClick={addListCard} type="button" size="m">
            추가하기
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
                    startCallback={() => {
                      updateWorkoutSets(index);
                    }}
                  />

                  <Button
                    className="rounded-full	border inline-flex items-center justify-center w-6 h-6"
                    onClick={() => removeListCardWithId(index)}
                    type="button"
                    size="s"
                  >
                    지우기
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
