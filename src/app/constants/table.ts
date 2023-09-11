import { IInformationFormatMap } from '../train/types/table';
import { formatSaveDate } from '../utils/format';

export const INFORMATION_FORMAT_MAP: IInformationFormatMap[] = [
  {
    name: '타겟부위',
    id: 'target',
  },
  {
    name: '종목이름',
    id: 'name',
  },
  {
    name: '중량(kg)',
    id: 'weight',
  },
  {
    name: '횟수',
    id: 'reps',
  },
  {
    name: '세트',
    id: 'set',
  },
  {
    name: '비고',
    id: 'remark',
  },
];

export const BASE_TABLE_FORM = {
  target: '',
  name: '',
  weight: 0,
  id: '',
  set: 0,
  reps: 0,
  remark: '',
};

export const DEFAULT_EXCEL_DATA = [
  {
    data: {
      name: 'N/A',
      remark: 'N/A',
      reps: 0,
      set: 0,
      target: 'N/A',
      weight: 0,
    },
    date: formatSaveDate(new Date()),
  },
];
