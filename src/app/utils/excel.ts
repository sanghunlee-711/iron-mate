const xlsx = require('xlsx');

export class Excel<TData> {
  data;

  constructor(data?: TData[]) {
    this.data = data;
  }

  formatData = <TFormatData>(
    unFormeddata: TFormatData[],
    header?: string[]
  ) => {
    return [header, ...unFormeddata];
  };

  readFromFile = async (file: File) => {
    //*TODO:
    /*
      1. export시 Sheet이름 > 년도-월-일 형태로 저장하기
      2. import할때 Sheet이름 기반날짜 안에 데이터로 저장하기 
          [{date: 2023-09-01, data:[{target:가슴,name:'벤치'} ...]},
          {date: 2023-09-02, data:[{target:가슴,name:'벤치'} ...]}]
      3. 위 형태를 브라우저 storage에 저장해놓고 해당 날짜 되면 가져와 상태로 변경하기
      (이 부분은 매번 파싱을 할 것이냐 아니냐를 생각해봐야할듯)
    */

    const workbook = xlsx.read(await file.arrayBuffer());
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // 헤더 옵션이 다양함. 나중에 한국어로 변경하려면 옵션 변경 필요
    //https://docs.sheetjs.com/docs/api/utilities/array#array-output
    const rawData = xlsx.utils.sheet_to_json(worksheet);

    return rawData;
  };

  makeFromData = () => {
    const today = new Date();
    const formatDate = new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
    }).format(today);

    const file = xlsx.utils.book_new();
    const trains = xlsx.utils.json_to_sheet(this.data, {
      // headers: this.headers,
      skipHeader: false,
    });

    xlsx.utils.book_append_sheet(file, trains);

    return xlsx.writeFile(file, `iron-mate-${formatDate}.xlsx`);
  };
}
