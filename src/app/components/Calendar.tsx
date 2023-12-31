'use client';

import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { TTrainData } from '../train/types/table';

const css = `
  .rdp {
    display: flex;
    align-items: center;
    justify-content: center;

    --rdp-cell-size: calc(52 / 512 * 100vw);
    --rdp-accent-color: black;
    --rdp-background-color: white;
    /* Switch to dark colors for dark themes */
    /* --rdp-accent-color-dark: gray; */ 
    /* --rdp-background-color-dark: #180270; */
    /* Outline border for focused elements */
    --rdp-outline: 2px solid var(--rdp-accent-color);
    /* Outline border for focused and selected elements */
    --rdp-outline-selected: 2px solid rgba(0, 0, 0, 0.75);
  }


  @media(min-width: 512px) {
    .rdp{
      --rdp-cell-size: 40px;
    }
  }

  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: black;
    color: white;
  }

`;

interface ICalendarProps {
  data?: TTrainData[];
  date: Date;
  handleDate: (date: Date) => void;
}

const checkedStyle = { color: 'pink' };

const Calendar: React.FC<ICalendarProps> = ({ data, date, handleDate }) => {
  const isExpanded = globalThis && globalThis?.innerWidth >= 512;
  const checkedDate = data?.map((el) => new Date(el.date));

  return (
    <div className="max-w-full overflow-x-scroll">
      <style>{css}</style>
      <DayPicker
        // footer={footer}
        // weekStartsOn={1} // Tuesday as first day of the week
        // firstWeekContainsDate={4} // Number the first week of the year from day 4
        mode="single"
        selected={date}
        onSelect={(day: Date | undefined) => handleDate(day || new Date())}
        modifiers={{ checked: checkedDate || [] }}
        modifiersStyles={{ checked: checkedStyle }}
        showOutsideDays
        fixedWeeks
        numberOfMonths={isExpanded ? 2 : 1}
        pagedNavigation
        showWeekNumber
        formatters={{
          formatWeekNumber: (weekNumber) => `W${weekNumber}`,
        }}
      />
    </div>
  );
};

export default Calendar;
