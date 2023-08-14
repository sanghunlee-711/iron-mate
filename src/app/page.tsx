import React from 'react';
import Calendar from './components/Calendar';
import SummaryInDateTable from './components/SummaryInDateTable';
import SummaryInMonth from './components/SummaryInMonth';

export default function History() {
  return (
    <main>
      <Calendar />
      <SummaryInDateTable />
      <SummaryInMonth />
    </main>
  );
}
