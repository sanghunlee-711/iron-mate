import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useTimer from '../hooks/useTimer';

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

const Timer = (timerProps: ITimerProps) => {
  const { onChange, hours, minutes, seconds, isStart, onStart, onStop } =
    useTimer(timerProps);

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
