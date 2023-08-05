'use client';

import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import Button from '../components/buttons/Button';
import EnterInformationTable from '../components/table/EnterInformationTable';
import { BASE_TABLE_FORM } from '../constants/table';
import { TableForm } from './types/table';

const Train = () => {
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
    console.log({ date: new Date(), excelData: data });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <Button type="submit" className="fixed">
            저장하기
          </Button>
          <div onClick={handleAddButton}>+</div>
        </div>
        <ul className="bg-white mt-3 flex flex-col justify-center align-middle">
          {fields.map(({ id }, index) => (
            <li
              key={id}
              className="border border-slate-300 p-3 rounded-md mb-3"
            >
              <div className="flex justify-between align-middle">
                <div>60:00s</div>
                <div
                  className="rounded-full	border inline-flex items-center justify-center w-8 h-8 text-purple-400 text-base font-semibold"
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
