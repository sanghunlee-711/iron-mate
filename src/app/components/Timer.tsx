import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { formatTime, intToStringFormat } from '../utils/format';
import worker_script from './worker-scripts.js';

interface ITimerProps {
  isInitialStart?: boolean;
  startCallback?: () => void;
  endCallback?: () => void;
  targetTime?: {
    hh: number;
    mm: number;
    ss: number;
  };
}

const timerWorker = new Worker(worker_script);

const Timer: React.FC<ITimerProps> = ({
  isInitialStart = false,
  startCallback,
  endCallback,
  targetTime = {
    hh: 0,
    mm: 1,
    ss: 30,
  },
}) => {
  const { hh, mm, ss } = targetTime;

  const HH = hh ? hh : 0;
  const MM = mm ? mm : 0;
  const SS = ss ? ss : 0;
  const INITAL_TIME_NUM = HH * 60 * 60 + MM * 60 + SS;
  const count = useRef(INITAL_TIME_NUM);
  const interval = useRef<NodeJS.Timer | undefined>(undefined);

  const [isStart, setIsStart] = useState<boolean>(false);
  const [hours, setHours] = useState(intToStringFormat(HH));
  const [minutes, setMinutes] = useState(intToStringFormat(MM));
  const [seconds, setSeconds] = useState(intToStringFormat(SS));

  const onStart = () => {
    startCallback && startCallback();

    setIsStart(true);

    interval.current = setInterval(() => {
      count.current -= 1;
      const currentValue = count.current;

      const [h, m, s] = [
        Math.floor(currentValue / 3600),
        Math.floor((currentValue % 3600) / 60),
        currentValue % 60,
      ];

      setHours(intToStringFormat(h));
      setMinutes(intToStringFormat(m));
      setSeconds(intToStringFormat(s));
    }, 1000);
  };

  const onReset = () => {
    clearInterval(interval.current);

    setHours(intToStringFormat(HH));
    setMinutes(intToStringFormat(MM));
    setSeconds(intToStringFormat(SS));
    setIsStart(false);
    count.current = INITAL_TIME_NUM;
  };

  const onStop = () => {
    setIsStart(false);
    clearInterval(interval.current);
  };

  const recalculateRefNumber = () => {
    const [h, m, s] = [+hours * 60 * 60, +minutes * 60, +seconds];
    const calculatedToSeconds = Math.abs(h + m + s);

    count.current = calculatedToSeconds;
  };

  const onChange = (
    newNumber: number,
    type: 'hours' | 'minutes' | 'seconds'
  ) => {
    if (isStart) return;

    const formatedNumber = intToStringFormat(newNumber);

    if (type === 'hours') setHours(formatedNumber);
    if (type === 'minutes') setMinutes(formatedNumber);
    if (type === 'seconds') setSeconds(formatedNumber);
  };

  const startWebWorkerTimer = () => {
    timerWorker.postMessage({ turn: 'on' });
  };

  const resetWebWorkerTimer = () => {
    timerWorker.postMessage({ turn: 'off' });
    onReset();
  };

  useEffect(() => {
    if (isInitialStart) onStart();
  }, []);

  useEffect(() => {
    timerWorker.onmessage = ({ data: { time } }) => {};
  }, []);

  useEffect(() => {
    if (count.current < 0) {
      onReset();
      clearInterval(interval.current);
      if (endCallback) endCallback();
    }
    recalculateRefNumber();
  }, [hours, minutes, seconds]);

  return (
    <div className="flex items-center justify-center">
      <input
        type="number"
        value={hours}
        onChange={(e) => onChange(+e.target.value, 'hours')}
        min={0}
        className="w-10 border border-slate-400	rounded-md	text-center	mr-1"
        aria-label="hours-input"
      />
      :
      <input
        name="minutes"
        min={0}
        max={59}
        maxLength={2}
        type="number"
        onChange={(e) => onChange(+e.target.value, 'minutes')}
        value={minutes}
        className="w-10 border border-slate-400	rounded-md	text-center	mx-1"
        aria-label="minutes-input"
      />
      :
      <input
        name="seconds"
        min={0}
        max={59}
        maxLength={2}
        type="number"
        onChange={(e) => onChange(+e.target.value, 'seconds')}
        value={seconds}
        className="w-10 border border-slate-400	rounded-md	text-center	ml-1"
        aria-label="seconds-input"
      />
      {isStart ? (
        <button
          onClick={onStop}
          className="ml-2"
          name="stop"
          role="button"
          type="button"
        >
          <Image
            src="/images/stop-icon.svg"
            alt="stop"
            width={12}
            height={12}
          />
        </button>
      ) : (
        <button
          onClick={onStart}
          className="ml-2"
          name="start"
          role="button"
          type="button"
        >
          <Image
            src="/images/start-icon.svg"
            alt="start"
            width={12}
            height={12}
          />
        </button>
      )}
    </div>
  );
};

export default Timer;
