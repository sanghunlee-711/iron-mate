import React from 'react';
import { TTrainData } from '../train/types/table';

const MOCK_SUMMARY_TABLE = [
  {
    id: 1,
    parts: '가슴',
    sets: 24,
    reps: 10 * 3 * 3,
  },
  {
    id: 2,
    parts: '등',
    sets: 20,
    reps: 12 * 3 * 4,
  },
];

interface ISummaryInMonth {
  date: Date;
  data: TTrainData[];
}

const getMonthFromDate = (date: Date) => {
  return date.getMonth();
};

const SummaryInMonth: React.FC<ISummaryInMonth> = ({ date }) => {
  const dateFormatInEng = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);

  return (
    <>
      <h1 className="font-bold my-3 text-lg">Summary of {dateFormatInEng}</h1>
      <table className="table-auto border-collapse border-8 border-slate-300 w-full	rounded-md overflow-hidden mt-2 border-soild ring-1 ring-slate-200">
        <tbody>
          <tr className="border border-slate-300">
            <th className="table-base">Parts</th>
            <th className="table-base">Sets</th>
            <th className="table-base">Reps(Sum of Sets * reps)</th>
          </tr>
          {MOCK_SUMMARY_TABLE.map(({ id, parts, sets, reps }) => {
            return (
              <tr key={id + parts} className="border border-slate-300">
                <td className="table-base">{parts}</td>
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

export default SummaryInMonth;
