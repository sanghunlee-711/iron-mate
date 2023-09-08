import { TTrainData } from '../train/types/table';
import { intToStringFormat } from './format';

const xlsx = require('xlsx');

export class Excel {
  constructor() {}

  readFromFile = async (file: File) => {
    const workbook = xlsx.read(await file.arrayBuffer());
    const worksheets = workbook.SheetNames.map(
      (sheetName: string) => workbook.Sheets[sheetName]
    );
    // 헤더 옵션이 다양함. 나중에 한국어로 변경하려면 옵션 변경 필요
    //https://docs.sheetjs.com/docs/api/utilities/array#array-output

    const rawData = worksheets.map((worksheet: any, index: number) => {
      const date = workbook.SheetNames[index];
      const data = xlsx.utils.sheet_to_json(worksheet);

      return {
        date,
        data,
      };
    });

    return rawData;
  };

  makeFromData = (data: TTrainData[]) => {
    const today = new Date();
    const [year, month, date] = [
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ];

    const formatDate = `${year}-${intToStringFormat(month)}-${intToStringFormat(
      date
    )}`;

    const file = xlsx.utils.book_new();

    data.forEach((el) => {
      const ws = xlsx.utils.json_to_sheet(el.data, {
        // headers: this.headers,
        skipHeader: false,
      });
      console.log('foremdData', ws, el.data, el.date);
      xlsx.utils.book_append_sheet(file, ws, el.date);
    });

    return xlsx.writeFile(file, `iron-mate-${formatDate}.xlsx`);
  };
}
