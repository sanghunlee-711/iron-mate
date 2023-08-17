import { NextResponse } from 'next/server';
import fs from 'fs';

// export async function GET() {
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   });
//   const data = await res.json();

//   return NextResponse.json({ data });
// }

export async function POST(req: Request) {
  const trainData = req.body as any;
  let data = '';

  trainData.trainTable.forEach((eachTrain: any) => {
    data =
      data +
      eachTrain.target +
      '\t' +
      eachTrain.name +
      '\t' +
      eachTrain.weight +
      '\t' +
      eachTrain.set +
      '\t' +
      eachTrain.reps +
      '\t' +
      eachTrain.remark +
      '\n';
  });

  // for (let i = 0; i < jsn.length; i++) {
  //   data =
  //     data + jsn[i].name + '\t' + jsn[i].school + '\t' + jsn[i].marks + '\n';
  // }
  const date = new Date();
  const formatDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);

  fs.appendFile(`iron-mate-${formatDate}.xls`, data, (err) => {
    if (err) throw err;

    alert('File created');
  });

  return NextResponse.json(data);
}
