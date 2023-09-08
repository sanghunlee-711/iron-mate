'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { ITrain, TTrainData } from '../train/types/table';
import { pushDateFormat } from '../utils/format';
import { extractSameTarget } from '../utils/summary';
import Button from './buttons/Button';

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
        <div className="flex items-center justify-between w-screen my-3">
          <h1 className="font-bold text-lg">Summary of {formatedDate}</h1>
          <Button onClick={() => route.push(`/train/${pushDateFormat(date)}`)}>
            Detail
          </Button>
        </div>
      </div>
      <table className="table-auto border-collapse border-8 border-slate-300 w-full	rounded-md overflow-hidden mt-2 border-soild ring-1 ring-slate-200">
        <thead>
          <tr className="border border-slate-300">
            <th className="table-base">Exercise</th>
            <th className="table-base">Sets</th>
            <th className="table-base">Volumes</th>
          </tr>
        </thead>
        <tbody className="max-h-28 overflow-y-scroll">
          {summaryData?.map(({ target, volumes, sets }) => {
            return (
              <tr key={target} className="border border-slate-300">
                <td className="table-base">{target}</td>
                <td className="table-base">{sets}</td>
                <td className="table-base">{volumes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SummaryInDateTable;
