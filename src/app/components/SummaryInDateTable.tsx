'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { ITrain, TTrainData } from '../train/types/table';
import { pushDateFormat } from '../utils/format';
import { extractSameTarget } from '../utils/summary';

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
  data?: TTrainData[];
}

const SummaryInDateTable: React.FC<ISummaryInDateTableProps> = ({
  date,
  data,
}) => {
  const route = useRouter();
  const formatedDate = new Intl.DateTimeFormat('ko-KR', {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
  }).format(date);

  const todayData = data?.filter((el) => {
    const elementDate = new Date(el.date);
    const currentDate = new Date(date);
    const [elYear, elMonth, elDate] = [
      elementDate.getFullYear(),
      elementDate.getMonth(),
      elementDate.getDate(),
    ];
    const [currYear, currMonth, currDate] = [
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    ];

    const isSameDay =
      elYear === currYear && elMonth === currMonth && elDate === currDate;
    return isSameDay;
  });

  const summaryData = extractSameTarget(
    todayData?.flatMap((el) => el.data) || []
  );

  return (
    <>
      <div className="flex align-middle justify-between ">
        <h1 className="font-bold my-3 text-lg">Summary of {formatedDate}</h1>
        <button
          onClick={() => route.push(`/train/${pushDateFormat(date)}`)}
          type="button"
        >
          Detail
        </button>
      </div>
      <table className="table-auto border-collapse border-8 border-slate-300 w-full	rounded-md overflow-hidden mt-2 border-soild ring-1 ring-slate-200">
        <thead>
          <tr className="border border-slate-300">
            <th className="table-base">Exercise</th>
            <th className="table-base">Sets</th>
            <th className="table-base">Reps</th>
          </tr>
        </thead>
        <tbody className="max-h-28 overflow-y-scroll">
          {summaryData?.map(({ target, reps, sets }) => {
            return (
              <tr key={target} className="border border-slate-300">
                <td className="table-base">{target}</td>
                <td className="table-base">{sets}</td>
                <td className="table-base">{reps}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SummaryInDateTable;
