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

import { assets } from "./data";

const poppinsLight = Poppins({ subsets: ["latin"], weight: ["300"] });
const poppinsMedium = Poppins({ subsets: ["latin"], weight: ["500"] });

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);

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

  const currentAsset = searchText.length
    ? assetList[0] || assets[0]
    : assets.find((asset) => asset.name == selectedAsset);

  return (
    <div className="flex flex-nowrap h-screen">
      <aside
        className={`${poppinsMedium.className} w-[320px] fixed h-screen min-w-[320px] bg-[#232323] p-4`}
      >
        <input
          ref={inputRef}
          className="border border-gray-700 p-2 rounded bg-[#181A1B] w-full"
          placeholder="Search for assets"
          value={searchText}
          onChange={(event) => setSearchText(event?.target?.value)}
        />

        <h2 className="pt-8 pb-4">Assets</h2>
        {assetList.map((asset, index) => {
          return (
            <div
              key={asset.name}
              className={`flex place-content-between cursor-pointer hover:text-[#ff6f1a] py-2`}
              onClick={() => {
                setSearchText("");
                setSelectedAsset(asset.name);
              }}
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
        className={`${poppinsLight.className} flex-grow flex justify-center p-4 pl-[320px]`}
      >
        <div className="max-w-[800px] w-full p-4">
          <h1 className={`${poppinsMedium.className} text-2xl pb-8`}>
            {currentAsset?.name}
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

          <h3 className="text-[#ff6f1a] pt-4">
            News about {currentAsset?.name}
          </h3>
          <div className="flex grid grid-cols-2 gap-4 pt-4 pb-16">
            {currentAsset?.newsItems?.map((newsItem) => (
              <a
                key={newsItem.link}
                href={newsItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-[#323232] hover:bg-[#282828] p-4 rounded-lg`}
              >
                <h4 className={`${poppinsMedium.className} pb-2`}>
                  {newsItem.headline}
                </h4>
                <p>{newsItem.text}</p>
                <p className="pt-2 text-sm">Read more</p>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
