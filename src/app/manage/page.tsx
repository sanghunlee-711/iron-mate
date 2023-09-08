'use client';

import React from 'react';
import { INFORMATION_FORMAT_MAP } from '../constants/table';
import { ITrain, TTrainData } from '../train/types/table';
import { Excel } from '../utils/excel';
import DataStorage from '../utils/storage';
import { checkWithTargetList } from '../utils/validate';

const Manage = () => {
  const dataStorage = new DataStorage();

  const validateUpload = (rawData: any) => {
    if (!rawData?.length) return false;
    if (!rawData[0]?.data) return false;

    const targetKeys = INFORMATION_FORMAT_MAP.map((el) => el.id);

    const dataKeys = Object.keys(rawData[0]?.data[0]);

    const isAcceptable = checkWithTargetList({
      dataKeys,
      targetKeys,
    });

    if (!isAcceptable) return false;
    return true;
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const storageData = dataStorage.get('iron-mate-data');

    if (!files) return alert('파일이 없어요');
    if (storageData) {
      //데이터 대체할 것인지에 대한 여부를 물어봐야함.
    }

    const excel = new Excel();
    const rawData = await excel.readFromFile(files[0]);

    if (!validateUpload(rawData)) {
      return alert('올바르지 않은 데이터형태 입니다.');
    }

    dataStorage.set('iron-mate-data', rawData);
  };

  const saveAsExcel = () => {
    const storageData = dataStorage.get('iron-mate-data') as TTrainData[];

    if (!storageData) alert('브라우저에 데이터가 없습니다.');

    const excel = new Excel();
    excel.makeFromData(storageData);
  };

  return (
    <div>
      <label htmlFor="uploadExcel">
        액셀 업로드 하기
        <input type="file" id="uploadExcel" onChange={(e) => uploadFile(e)} />
      </label>
      <button onClick={saveAsExcel}>데이터 액셀로 저장하기</button>
    </div>
  );
};

export default Manage;
