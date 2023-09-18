import { ITrain } from '../train/types/table';

export const checkWithTargetList = ({
  dataKeys,
  targetKeys,
}: {
  dataKeys: string[];
  targetKeys: string[];
}) => {
  const set = new Set();
  targetKeys.forEach((key) => set.add(key));

  for (let i = 0; i < dataKeys.length; i++) {
    const key = dataKeys[i];

    if (!set.has(key)) return false;
  }

  return true;
};

export const checkPossibilityToSave = (data: ITrain[]) => {
  for (let i = 0; i < data.length; i++) {
    const curr = data[i];

    const isPossible =
      curr.name &&
      curr.target &&
      Number(curr.set) > 0 &&
      Number(curr.reps) > 0 &&
      Number(curr.weight) > 0;

    if (!isPossible) return false;
  }

  return true;
};

export const checkIsTrainData = (data: any) => {};

export const checkPossibilityToRender = (trainData: any) => {
  if (!trainData.length) return false;
  if (!trainData.filter((el: any) => el?.data)?.length) return false;
  if (!trainData.filter((el: any) => el?.date)?.length) return false;

  return checkPossibilityToSave(trainData[0].data);
};
