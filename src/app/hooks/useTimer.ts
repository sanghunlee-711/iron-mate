import React, { useEffect, useRef, useState } from 'react';
import { ITimerProps } from '../interface/timer';
import { intToStringFormat } from '../utils/format';
import worker_script from '../../timerWorker/timerWorkerScripts';

const timerWorker = new Worker(worker_script);

const useTimer = ({
  isInitialStart = false,
  startCallback,
  endCallback,
  targetTime = {
    hh: 0,
    mm: 1,
    ss: 30,
  },
}: ITimerProps) => {
  const { hh, mm, ss } = targetTime;

  const HH = hh ? hh : 0;
  const MM = mm ? mm : 0;
  const SS = ss ? ss : 0;
  const INITAL_TIME_NUM = HH * 60 * 60 + MM * 60 + SS;

  const [isStart, setIsStart] = useState<boolean>(false);
  const [hours, setHours] = useState(intToStringFormat(HH));
  const [minutes, setMinutes] = useState(intToStringFormat(MM));
  const [seconds, setSeconds] = useState(intToStringFormat(SS));

  const onStart = () => {
    startCallback && startCallback();

    setIsStart(true);
    startWebWorkerTimer();
  };

  const onReset = () => {
    setIsStart(false);
    setHours(intToStringFormat(HH));
    setMinutes(intToStringFormat(MM));
    setSeconds(intToStringFormat(SS));
  };

  const onStop = () => {
    setIsStart(false);
    timerWorker.postMessage({ turn: 'stop' });
  };

  //*TODO: 여기도 분리 가능할 듯
  const pushUITimeToWorker = (uiTime: {
    hours: string;
    minutes: string;
    seconds: string;
  }) => {
    const { hours, minutes, seconds } = uiTime;

    const [h, m, s] = [+hours * 60 * 60, +minutes * 60, +seconds];
    const calculatedToSeconds = Math.abs(h + m + s);
    timerWorker.postMessage({ turn: 'set', setTime: calculatedToSeconds });
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
    const [h, m, s] = [+hours * 60 * 60, +minutes * 60, +seconds];
    const calculatedToSeconds = Math.abs(h + m + s);
    timerWorker.postMessage({ turn: 'on', setTime: calculatedToSeconds });
  };

  const resetWebWorkerTimer = () => {
    timerWorker.postMessage({ turn: 'reset', setTime: INITAL_TIME_NUM });
  };

  useEffect(() => {
    timerWorker.postMessage({ turn: 'set', setTime: INITAL_TIME_NUM });

    timerWorker.onmessage = ({ data }) => {
      const { time } = data;

      if (time <= 0) {
        resetWebWorkerTimer();
        onReset();
        return;
      }

      const [h, m, s] = [
        Math.floor(time / 3600),
        Math.floor((time % 3600) / 60),
        time % 60,
      ];

      setHours(intToStringFormat(h));
      setMinutes(intToStringFormat(m));
      setSeconds(intToStringFormat(s));
    };
  }, []);

  useEffect(() => {
    if (!isStart) pushUITimeToWorker({ hours, minutes, seconds });
  }, [hours, minutes, seconds]);

  return {
    hours,
    minutes,
    seconds,
    isStart,
    onChange,
    onStop,
    onStart,
  };
};

export default useTimer;
