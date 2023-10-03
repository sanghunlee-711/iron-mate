import React from 'react';
import { ICustomAlert } from '../interfaces/alert';
import DataStorage from '../utils/storage';

const useDialog = (): ICustomAlert => {
  //여기서 globalState를 핸들링하자!
  const toast = (message: string) => {};

  return {
    toast,
  };
};

const useStorage = () => {
  //dialogContext주입으로 변경해야함.

  const dataStorage = new DataStorage(useDialog());

  return dataStorage;
};

export default useStorage;
