'use client';

import React from 'react';
import Calendar from '../components/Calendar';
import SummaryInDateTable from '../components/SummaryInDateTable';
import SummaryInMonth from '../components/SummaryInMonth';
import { Excel } from '../utils/excel';

const Home = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files) return alert('파일이 없어요');

    const excel = new Excel();
    const rawData = excel.readFromFile(files[0]);
  };

  const handleDate = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <>
      <label htmlFor="uploadExcel">
        <input type="file" id="uploadExcel" onChange={(e) => uploadFile(e)} />
      </label>
      <Calendar date={date} handleDate={handleDate} />
      <SummaryInDateTable date={date} />
      <SummaryInMonth date={date} />
    </>
  );
};

export default Home;
