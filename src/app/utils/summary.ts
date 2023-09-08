import { TTrainData, ITrain } from '../train/types/table';
import { intToStringFormat } from './format';

export const extractSameMonthData = (data: TTrainData[], pickDate: Date) => {
  const pickedYear = pickDate.getFullYear();
  const pickedMonth = pickDate.getMonth() + 1; // ex) 8월
  //1. 동일 월 데이터를 모두 모아야함.
  return data
    .filter((el) => {
      const [y, m, d] = el.date.split('-');

      //이번 달 데이터만 모으기
      return m === intToStringFormat(pickedMonth) && `${pickedYear}` === y;
    })
    .flatMap((el) => el.data);
};

export const extractSameTarget = (trainData: ITrain[]) => {
  const summarizeData = trainData.reduce((targetMap, curr, idx, originArr) => {
    if (targetMap.has(curr.target)) {
      const value = targetMap.get(curr.target);

      if (value) {
        targetMap.set(curr.target, {
          target: curr.target,
          sets: Number(value?.sets) + Number(curr.set),
          reps: Number(value?.sets) * Number(value?.reps) + Number(curr.reps),
        });
      }
    } else {
      targetMap.set(curr.target, {
        target: curr.target,
        sets: Number(curr.set),
        reps: Number(curr.reps),
      });
    }

    //현재 부위가 이미 카운트 되었으면 ?..
    return targetMap;
  }, new Map() as Map<string, TSummarizeWithTarget>);

  return Array.from(summarizeData.values());
};

type TSummarizeWithTarget = { target: string; sets: number; reps: number };

export const summarizeInMonth = (data: TTrainData[], pickDate: Date) => {
  //1. 동일 월 데이터를 모두 모아야함.

  const sameMonthData = extractSameMonthData(data, pickDate);

  //2. 동일 부위별로만 데이터 모아야 함.
  return extractSameTarget(sameMonthData);
};
