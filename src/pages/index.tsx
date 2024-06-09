import { Inter } from "next/font/google";
import {TESTDATA, type TestData} from "@/pages/data";
import TableBody from "@/pages/TableBody";
import {useEffect, useState} from "react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState<Array<TestData>>([]);

  useEffect(() => {
    setData(TESTDATA);
  }, []);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
      <table>
        <thead>
        <tr>
          <th>Number</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
            {data.map((item) => <TableBody key={item.key} data={item} />)}
        </tbody>
      </table>
    </main>
  );
}
