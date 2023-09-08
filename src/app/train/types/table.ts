export interface ITrain {
  target: string;
  name: string;
  weight: number;
  id?: string;
  set: number;
  reps: number;
  remark: string;
}

export type TableForm = {
  trainTable: ITrain[];
};

export interface IInformationFormatMap {
  name: string;
  id: keyof ITrain;
}

export type TTrainData = { date: string; data: ITrain[] };
