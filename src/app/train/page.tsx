'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { pushDateFormat } from '../utils/format';

const TrainIndex = () => {
  const route = useRouter();

  React.useEffect(() => {
    const today = new Date();

    route.replace(`/train/${pushDateFormat(today)}`);
  }, []);

  return <div>Setting date...</div>;
};

export default TrainIndex;
