import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { formatTime, intToStringFormat } from '../utils/format';

interface ITimerProps {
  isInitialStart?: boolean;
  initialCallback?: () => void;
  endCallback?: () => void;
  targetTime?: {
    hh: number;
    mm: number;
    ss: number;
  };
}

const Timer: React.FC<ITimerProps> = ({
  isInitialStart = false,
  initialCallback,
  endCallback,
  targetTime = {
    hh: 0,
    mm: 0,
    ss: 10,
  },
}) => {
  const { hh, mm, ss } = targetTime;

  const HH = hh ? hh : 0;
  const MM = mm ? mm : 0;
  const SS = ss ? ss : 0;
  const INITAL_TIME_NUM = HH * 60 * 60 + MM * 60 + SS;
  const count = useRef(INITAL_TIME_NUM);
  const interval = useRef<NodeJS.Timer | undefined>(undefined);
  const INITIAL_TIME_STATE = `${hh}:${mm}:${ss}`;
  const [timer, setTimer] = useState(formatTime(INITIAL_TIME_STATE));
  const [isStart, setIsStart] = useState<boolean>(false);

  const onStart = () => {
    initialCallback && initialCallback();

    setIsStart(true);

    interval.current = setInterval(() => {
      count.current -= 1;

      const [h, m, s] = [
        Math.floor(count.current / 3600),
        Math.floor((count.current % 3600) / 60),
        count.current % 60,
      ];
      const formatedCurrTime =
        intToStringFormat(h) +
        ':' +
        intToStringFormat(m) +
        ':' +
        intToStringFormat(s);

      setTimer(formatedCurrTime);
    }, 1000);
  };

  const onReset = () => {
    clearInterval(interval.current);
    count.current = INITAL_TIME_NUM;
    setTimer(formatTime(INITIAL_TIME_STATE));
  };

  const onStop = () => {
    setIsStart(false);
    clearInterval(interval.current);
  };

  useEffect(() => {
    if (isInitialStart) onStart();
  }, []);

  useEffect(() => {
    if (count.current <= 0) {
      endCallback && endCallback();
      clearInterval(interval.current);
    }
  }, [timer]);

  return (
    <div>
      {timer}
      {isStart ? (
        <button onClick={onStop} className="ml-2">
          <Image src="stop-icon.svg" alt="start" width={12} height={12} />
        </button>
      ) : (
        <button onClick={onStart} className="ml-2">
          <Image src="start-icon.svg" alt="start" width={12} height={12} />
        </button>
      )}
    </div>
  );
};

export default Timer;
