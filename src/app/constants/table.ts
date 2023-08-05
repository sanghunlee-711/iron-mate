import { IInformationFormatMap } from '../train/types/table';

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
    name: '중량',
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
  weight: '',
  id: '',
  set: 0,
  reps: 0,
  remark: '',
};
