'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const MOCK_SUMMARY_TABLE = [
  {
    id: 1,
    exserciseName: '벤치프레스',
    sets: 3,
    remark: '너무 무거웠음',
  },
  {
    id: 2,
    exserciseName: '풀업',
    sets: 2,
    remark: '비교적 수월',
  },
];

interface ISummaryInDateTableProps {
  date: Date;
}

const SummaryInDateTable: React.FC<ISummaryInDateTableProps> = ({ date }) => {
  const route = useRouter();
  const formatedDate = new Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  }).format(date);
  console.log(new Intl.DateTimeFormat('en-US').format(date));
  return (
    <>
      <div className="flex align-middle justify-between">
        <h1 className="font-bold my-3 text-lg">Summary of {formatedDate}</h1>
        <button
          onClick={() =>
            route.push(
              `/train/${new Intl.DateTimeFormat('ko-KR')
                .format(date)
                .replaceAll(/\./gi, '-')
                .replaceAll(/ /gi, '')}`
            )
          }
          type="button"
        >
          Detail
        </button>
      </div>
      <table className="table-auto border-collapse border-8 border-slate-300 w-full	rounded-md overflow-hidden mt-2 border-soild ring-1 ring-slate-200">
        <tbody>
          <tr className="border border-slate-300">
            <th className="table-base">Exercise</th>
            <th className="table-base">Sets</th>
            <th className="table-base">Remark</th>
          </tr>
          {MOCK_SUMMARY_TABLE.map(({ id, exserciseName, sets, remark }) => {
            return (
              <tr key={id + exserciseName} className="border border-slate-300">
                <td className="table-base">{exserciseName}</td>
                <td className="table-base">{sets}</td>
                <td className="table-base">{remark}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SummaryInDateTable;
