import { TableForm } from '../train/types/table';
const xlsx = require('xlsx');

export const makeExcelWithData = (trainData: TableForm) => {
  const date = new Date();
  const formatDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);

  const file = xlsx.utils.book_new();
  const trains = xlsx.utils.json_to_sheet(trainData.trainTable, {
    headers: [],
    skipHeader: true,
  });
  xlsx.utils.book_append_sheet(file, trains);

  return xlsx.writeFile(file, `젠장-${formatDate}.xlsx`);
};
