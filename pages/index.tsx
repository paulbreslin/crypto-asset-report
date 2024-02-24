// @ts-nocheck
import { useState, useRef } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { useHotkeys } from "react-hotkeys-hook";
import Fuse from "fuse.js";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const poppinsLight = Poppins({ subsets: ["latin"], weight: ["300"] });
const poppinsMedium = Poppins({ subsets: ["latin"], weight: ["500"] });

const assets = [
  {
    name: "Bitcoin",
    price: "£41,134",
    change: "121%",
    marketCap: "£790B",
    volume: "£19B",
    data: [
      { date: "2023-02-01", price: 30000 },
      { date: "2023-03-01", price: 28000 },
      { date: "2023-04-01", price: 32000 },
      { date: "2023-05-01", price: 34000 },
      { date: "2023-06-01", price: 33000 },
      { date: "2023-07-01", price: 35000 },
      { date: "2023-08-01", price: 36000 },
      { date: "2023-09-01", price: 37000 },
      { date: "2023-10-01", price: 38000 },
      { date: "2023-11-01", price: 40000 },
      { date: "2023-12-01", price: 39000 },
      { date: "2024-01-01", price: 41000 },
    ],
  },
  {
    name: "Ethereum",
    price: "£2,050",
    change: "84%",
    marketCap: "£278B",
    volume: "£11B",
    data: [
      { date: "2023-02-01", price: 1500 },
      { date: "2023-03-01", price: 1450 },
      { date: "2023-04-01", price: 1550 },
      { date: "2023-05-01", price: 1600 },
      { date: "2023-06-01", price: 1700 },
      { date: "2023-07-01", price: 1650 },
      { date: "2023-08-01", price: 1750 },
      { date: "2023-09-01", price: 1800 },
      { date: "2023-10-01", price: 1900 },
      { date: "2023-11-01", price: 2000 },
      { date: "2023-12-01", price: 1950 },
      { date: "2024-01-01", price: 2050 },
    ],
  },
  {
    name: "Tether",
    price: "£1.0",
    change: "-0.07",
    marketCap: "£77B",
    volume: "£40B",
    data: [
      { date: "2023-02-01", price: 1.0 },
      { date: "2023-03-01", price: 1.01 },
      { date: "2023-04-01", price: 1.0 },
      { date: "2023-05-01", price: 0.99 },
      { date: "2023-06-01", price: 1.0 },
      { date: "2023-07-01", price: 1.0 },
      { date: "2023-08-01", price: 1.01 },
      { date: "2023-09-01", price: 1.0 },
      { date: "2023-10-01", price: 1.0 },
      { date: "2023-11-01", price: 0.99 },
      { date: "2023-12-01", price: 1.0 },
      { date: "2024-01-01", price: 1.0 },
    ],
  },
  {
    name: "BNP",
    price: "£410.57",
    change: "-0.07",
    marketCap: "£77B",
    volume: "£40B",
    data: [
      { date: "2023-02-01", price: 300 },
      { date: "2023-03-01", price: 320 },
      { date: "2023-04-01", price: 310 },
      { date: "2023-05-01", price: 330 },
      { date: "2023-06-01", price: 340 },
      { date: "2023-07-01", price: 350 },
      { date: "2023-08-01", price: 370 },
      { date: "2023-09-01", price: 360 },
      { date: "2023-10-01", price: 380 },
      { date: "2023-11-01", price: 400 },
      { date: "2023-12-01", price: 390 },
      { date: "2024-01-01", price: 410 },
    ],
  },
  {
    name: "Solana",
    price: "£140.28",
    change: "-0.07",
    marketCap: "£77B",
    volume: "£40B",
    data: [
      { date: "2023-02-01", price: 90 },
      { date: "2023-03-01", price: 85 },
      { date: "2023-04-01", price: 100 },
      { date: "2023-05-01", price: 95 },
      { date: "2023-06-01", price: 110 },
      { date: "2023-07-01", price: 105 },
      { date: "2023-08-01", price: 120 },
      { date: "2023-09-01", price: 115 },
      { date: "2023-10-01", price: 130 },
      { date: "2023-11-01", price: 125 },
      { date: "2023-12-01", price: 135 },
      { date: "2024-01-01", price: 140 },
    ],
  },
];

export default function Home() {
  const inputRef = useRef(null);

  const [selectedAsset, setSelectedAsset] = useState("Bitcoin");
  const [searchText, setSearchText] = useState("");

  useHotkeys("/", (event) => {
    event.preventDefault();
    inputRef?.current?.focus();
  });

  const fuse = new Fuse(assets, {
    keys: ["name"],
    threshold: 0.2,
  });

  const results = fuse.search(searchText);

  const assetList = searchText.length
    ? results.map((result) => result.item)
    : assets;

  const currentAsset =
    searchText.length && assetList.length === 1
      ? assetList[0]
      : assets.find((asset) => asset.name == selectedAsset);

  return (
    <div className="flex flex-nowrap h-screen">
      <aside
        className={`${poppinsMedium.className} w-[320px] min-w-[320px] bg-[#232323] p-4`}
      >
        <input
          ref={inputRef}
          className="border p-2 rounded bg-[#181A1B] w-full"
          placeholder="Search for assets"
          value={searchText}
          onChange={(value) => setSearchText(event.target.value)}
        />

        <h2 className="pt-8 pb-4">Assets</h2>
        {assetList.map((asset, index) => {
          return (
            <div
              key={asset.name}
              className={`flex place-content-between cursor-pointer hover:text-[#ff6f1a] py-2`}
              onClick={() => setSelectedAsset(asset.name)}
            >
              <div>{asset.name}</div>
              <div>{asset.price}</div>
            </div>
          );
        })}
        {Boolean(searchText.length) && !assetList.length && (
          <div>No assets found</div>
        )}
      </aside>
      <main
        className={`${poppinsLight.className} flex-grow flex justify-center p-4`}
      >
        <div className="max-w-[800px] w-full p-4">
          <h1 className={`${poppinsMedium.className} text-xl pb-8`}>
            {currentAsset.name}
          </h1>
          <LineChart
            width={750}
            height={400}
            data={currentAsset?.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </main>
    </div>
  );
}
