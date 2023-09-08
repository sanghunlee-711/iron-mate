'use client';

import React from 'react';
import { ITrain, TTrainData } from '../train/types/table';
import { Excel } from '../utils/excel';
import DataStorage from '../utils/storage';

const Manage = () => {
  const dataStorage = new DataStorage();

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 액셀 데이터를 알맞는 형태로 파싱해서 localStorage에  저장해줌.
    const files = e.target.files;
    const storageData = dataStorage.get('iron-mate-data');

    if (!files) return alert('파일이 없어요');
    if (storageData) {
      //데이터 대체할 것인지에 대한 여부를 물어봐야함.
    }

    const excel = new Excel();
    const rawData = await excel.readFromFile(files[0]);

    dataStorage.set('iron-mate-data', rawData);
  };

  const save = () => {
    // localStorage에 저장되어있는 데이터를 액셀로 추출해줌.
    const storageData = dataStorage.get('iron-mate-data') as TTrainData[];

    if (!storageData) alert('브라우저에 데이터가 없습니다.');

    console.log(storageData);
    const excel = new Excel();
    excel.makeFromData(storageData);
  };

  return (
    <div>
      <label htmlFor="uploadExcel">
        액셀 업로드 하기
        <input type="file" id="uploadExcel" onChange={(e) => uploadFile(e)} />
      </label>
      <button onClick={save}>데이터 액셀로 저장하기</button>
    </div>
  );
};

export default Manage;
