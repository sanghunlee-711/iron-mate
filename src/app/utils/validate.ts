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
