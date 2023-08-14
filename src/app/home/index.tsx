'use client';

import React from 'react';
import Calendar from '../components/Calendar';
import SummaryInDateTable from '../components/SummaryInDateTable';
import SummaryInMonth from '../components/SummaryInMonth';

const Home = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  const handleDate = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <>
      <Calendar date={date} handleDate={handleDate} />
      <SummaryInDateTable date={date} />
      <SummaryInMonth date={date} />
    </>
  );
};

export default Home;
