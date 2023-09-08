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
    console.log(curr);
    const isPossible =
      curr.name &&
      curr.target &&
      Number(curr.set) > 0 &&
      Number(curr.reps) > 0 &&
      Number(curr.weight) > 0;
    console.log({ isPossible });
    if (!isPossible) return false;
  }

  return true;
};
