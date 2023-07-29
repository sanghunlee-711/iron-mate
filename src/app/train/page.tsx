'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/buttons/Button';
import EnterInformationTable from '../components/table/EnterInformationTable';
import { TableForm } from './types/table';

const Train = () => {
  const { handleSubmit, register } = useForm<TableForm>();
  const [list, setList] = React.useState<{ id: string }[]>([
    { id: 'test-1' },
    { id: 'test-2' },
  ]);

  const handleAddButton = () => {
    console.log('work?');
    const [key, newId] = Object.keys(list[list.length - 1])[0].split('-');
    const addNew = [
      ...list,
      {
        id: `${key}-${Number(newId) + 1}`,
      },
    ];

    setList(addNew);
  };

  const onSubmit = (data: TableForm) => {
    const excelList = Object.keys(data).reduce(
      (acc, curr) => {
        const [filledKey, excelIdx] = curr.split('-');

        if (!filledKey) return acc;

        acc[Number(excelIdx)][filledKey] = data[curr] || 'N/A';

        return acc;
      },
      Array.from({ length: Number(list.length) }, () => {
        return {};
      }) as any[]
    );

    console.log(excelList);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul className="bg-white mt-3">
        {list.map((el, index) => (
          <li key={el.id} className="">
            <EnterInformationTable
              register={register}
              identifier={index + ''}
            />
          </li>
        ))}
        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('work?');
            handleAddButton();
          }}
        >
          추가하기버튼이에요
        </Button>
      </ul>
      <Button type="submit">버튼이에요</Button>
    </form>
  );
};

export default Train;
