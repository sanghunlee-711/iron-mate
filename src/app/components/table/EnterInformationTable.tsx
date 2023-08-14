'use client';

import { INFORMATION_FORMAT_MAP } from '@/app/constants/table';
import { TableForm } from '@/app/train/types/table';
import { unique } from 'next/dist/build/utils';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface IFormProps {
  register: UseFormRegister<TableForm>;
  identifier: string;
}

const EnterInformationTable: React.FC<IFormProps> = ({
  register,
  identifier,
}) => {
  return (
    <table className="table-auto border-collapse border-8 border-slate-300 w-full	rounded-md overflow-hidden mt-2 border-soild ring-1 ring-slate-200">
      <tbody>
        {INFORMATION_FORMAT_MAP.map(({ name, id }) => {
          const uniqueId = `trainTable.${Number(identifier)}.${id}` as const;

          return (
            <tr key={uniqueId} className="border border-slate-300">
              <td className="table-base">
                <label htmlFor={uniqueId}>{name}</label>
              </td>
              <td className="table-base">
                <input
                  {...register(uniqueId)}
                  type="text"
                  id={uniqueId}
                  className="w-full text-sm"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EnterInformationTable;
