export interface ITimerProps {
  isInitialStart?: boolean;
  startCallback?: () => void;
  endCallback?: () => void;
  targetTime?: {
    hh: number;
    mm: number;
    ss: number;
  };
}
