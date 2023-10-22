'use client';

import React from 'react';
import { TTrainData } from '../train/types/table';
import DataStorage from '../class/storage';
import { checkPossibilityToRender } from '../utils/validate';
import Button from '../components/buttons/Button';
import { useRouter } from 'next/navigation';
import { DEFAULT_EXCEL_DATA } from '../constants/table';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('../components/Calendar'), {
  ssr: false,
});

const SummaryInDateTable = dynamic(
  () => import('../components/SummaryInDateTable'),
  {
    ssr: false,
  }
);

const SummaryInMonth = dynamic(() => import('../components/SummaryInMonth'), {
  ssr: false,
});

const NotMachedForamt = ({
  handleDeleteExcel,
}: {
  handleDeleteExcel: () => void;
}) => {
  return (
    <div className="flex items-center flex-col">
      <p className="mb-4 text-slate-400	text-center py-2 px-4 break-words	whitespace-break-spaces">
        올바르지 않은 데이터 형태입니다.{'\n'}
        다시 한번 액셀 데이터를 확인해주세요.
      </p>
      <Button onClick={handleDeleteExcel}>액셀 데이터 지우러 가기</Button>
    </div>
  );
};

const Home = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const route = useRouter();
  const dataStorage = new DataStorage();
  const data =
    (dataStorage.get('iron-mate-data') as TTrainData[]) || DEFAULT_EXCEL_DATA;

  const handleDate = (newDate: Date) => {
    setDate(newDate);
  };

  if (!checkPossibilityToRender(data))
    return <NotMachedForamt handleDeleteExcel={() => route.push('/manage')} />;

  return (
    <>
      <Calendar date={date} handleDate={handleDate} data={data} />
      <SummaryInDateTable date={date} data={data} />
      <SummaryInMonth date={date} data={data} />
    </>
  );
};

export default Home;
