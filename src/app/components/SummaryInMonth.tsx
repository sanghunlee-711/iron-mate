import React from 'react';
import { TTrainData } from '../train/types/table';
import { summarizeInMonth } from '../utils/summary';

interface ISummaryInMonth {
  date: Date;
  data?: TTrainData[];
}

const SummaryInMonth: React.FC<ISummaryInMonth> = ({ date, data }) => {
  const dateFormatInEng = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);

  const summarizeData = summarizeInMonth(data || [], date);

  return (
    <>
      <h1 className="font-bold my-3 text-lg">Summary of {dateFormatInEng}</h1>
      <table className="table-auto border-collapse border-8 border-slate-300 w-full	rounded-md overflow-hidden mt-2 border-soild ring-1 ring-slate-200">
        <tbody>
          <tr className="border border-slate-300">
            <th className="table-base">Parts</th>
            <th className="table-base">Sets</th>
            <th className="table-base">Volumes(Sum of Sets * reps)</th>
          </tr>
          {summarizeData.map(({ target, sets, volumes }) => {
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

export default SummaryInMonth;
