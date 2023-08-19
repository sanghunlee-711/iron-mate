const xlsx = require('xlsx');

export class Excel<TData> {
  data;

  constructor(data: TData) {
    this.data = data;
  }

  makeFromData = () => {
    const { data } = this;

    const today = new Date();
    const formatDate = new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
    }).format(today);

    const file = xlsx.utils.book_new();
    const trains = xlsx.utils.json_to_sheet(data, {
      headers: [],
      skipHeader: true,
    });

    xlsx.utils.book_append_sheet(file, trains);

    return xlsx.writeFile(file, `iron-mate-${formatDate}.xlsx`);
  };
}