'use client';

import React from 'react';
import Calendar from '../components/Calendar';
import SummaryInDateTable from '../components/SummaryInDateTable';
import SummaryInMonth from '../components/SummaryInMonth';
import { TTrainData } from '../train/types/table';
import DataStorage from '../utils/storage';

const Home = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const dataStorage = new DataStorage();
  const data = dataStorage.get('iron-mate-data') as TTrainData[];

  const handleDate = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <>
      <Calendar date={date} handleDate={handleDate} data={data} />
      <SummaryInDateTable date={date} data={data} />
      <SummaryInMonth date={date} data={data} />
    </>
  );
};

export default Home;
