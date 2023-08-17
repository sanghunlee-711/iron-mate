import React from 'react';

interface IDateInputProps {
  date: string;
  handleDate: (date: Date) => void;
}

const DateInput: React.FC<IDateInputProps> = ({ date, handleDate }) => {
  return (
    <input
      type="date"
      value={date}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleDate(new Date(e.target.value))
      }
    />
  );
};

export default DateInput;
