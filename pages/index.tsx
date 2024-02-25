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
    newsItems: [
      {
        date: "Feb 24",
        headline:
          "Crypto projects have received over $90 billion in all-time funding",
        text: "The total dollar amount invested in crypto and blockchain startups passed an important milestone after a busy start to the year.",
        link: "https://www.theblock.co/post/278442/crypto-projects-have-received-over-90-billion-in-all-time-funding?utm_source=rss&utm_medium=rss",
      },
      {
        date: "Feb 23",
        headline:
          "This Week in Coins: Ethereum Steals the Show, Bitcoin Loses Steam, and AI Tokens Explode",
        text: "Ethereum and Uniswap stole the show this week. AI tokens also exploded.",
        link: "https://decrypt.co/218806/this-week-in-coins-ethereum-steals-the-show-bitcoin-loses-steam-and-ai-tokens-explode",
      },
      {
        date: "Feb 15",
        headline:
          "Bitcoin’s appeal as a hedge against ongoing inflationary pressures is increasing, analysts say",
        text: "Bitcoin is emerging as an attractive choice for portfolio diversification in a climate were inflation remains persistent, analysts said.",
        link: "https://www.theblock.co/post/278796/bitcoins-appeal-as-a-hedge-against-ongoing-inflationary-pressures-is-increasing-analysts-say?utm_source=rss&utm_medium=rss",
      },
      {
        date: "Jan 4",
        headline:
          "$30 billion RIA Platform Carson Group Approves To Offer Spot Bitcoin ETFs To Clients",
        text: "Carson Group has approved to list BlackRock, Fidelity, Bitwise, and Franklin's spot Bitcoin ETFs for trading.",
        link: "https://bitcoinmagazine.com/business/30-billion-ria-platform-carson-group-approves-to-offer-spot-bitcoin-etfs-to-clients",
      },
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
    newsItems: [
      {
        date: "Feb 21",
        headline:
          "Crypto projects have received over $90 billion in all-time funding",
        text: "The total dollar amount invested in crypto and blockchain startups passed an important milestone after a busy start to the year.",
        link: "https://www.theblock.co/post/278442/crypto-projects-have-received-over-90-billion-in-all-time-funding?utm_source=rss&utm_medium=rss",
      },
      {
        date: "Feb 14",
        headline:
          "This Week in Coins: Ethereum Steals the Show, Bitcoin Loses Steam, and AI Tokens Explode",
        text: "Ethereum and Uniswap stole the show this week. AI tokens also exploded.",
        link: "https://decrypt.co/videos/interviews/Nh4p6vVD/pudgy-penguins-teams-up-with-unstoppable-domains",
      },
      {
        date: "Feb 1",
        headline: "Pudgy Penguins Teams Up With Unstoppable Domains",
        text: "Pudgy Penguins CEO Luca Netz and Unstoppable Domains COO Sandy Carter joined Decrypt's Stephen Graves at NFT Paris to talk about the...",
        link: "https://decrypt.co/218806/this-week-in-coins-ethereum-steals-the-show-bitcoin-loses-steam-and-ai-tokens-explode",
      },
      {
        date: "Jan 7",
        headline:
          "One trader Leverages $2m on Bored Apes as co-founder steps back into CEO role",
        text: "Yuga Labs rebounds with Proof Collective acquisition and CEO shuffle, sparking significant market moves from enigmatic traders.",
        link: "https://www.dlnews.com/articles/web3/one-trader-leverages-2m-on-bored-apes-before-ceo-news/",
      },
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
    newsItems: [
      {
        date: "Jan 18, 24",
        headline: "State of EOS Q4 2023",
        text: "Q4 featured a bounce-back quarter for EOS, with many of its key metrics increasing QoQ. The integration of USDT into the EOS Trustless Bridge...",
        link: "https://messari.io/article/state-of-eos-q4-2023",
      },
      {
        date: "Dec 14, 23",
        headline:
          "Why 163-year-old ratings firm S&P suddenly decided to rank stablecoin Tether",
        text: "The influential ratings outfit launched its stablecoin report this week with a sweeping survey of offerings.",
        link: "https://beincrypto.com/bitcoin-reaction-tether-mints-2-billion-usdt/",
      },
      {
        date: "Jan 04, 24",
        headline:
          "What Will Happen to Crypto After Tether Mints 2 Billion USDT in 10 Days",
        text: "Tether's minting of 2 billion USDT could signal a significant Bitcoin rally, as analysts predict a spike to $48,628, followed by volatility. Historical...",
        link: "https://www.dlnews.com/articles/markets/why-ratings-agency-panned-tether-and-usdt-for-risky-assets/",
      },
      {
        date: "Dec 08, 23",
        headline:
          "Tether’s USDT Market Cap Hits New Record as Stablecoins Recover",
        text: "USDT breached $90 billion in market cap for the first time.",
        link: "https://thedefiant.io/tether-s-usdt-market-cap-hits-new-record-as-stablecoins-recover",
      },
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
    newsItems: [
      {
        date: "Feb 22",
        headline:
          "You Can Now Move Brave Browser Rewards On-Chain With a Solana Wallet",
        text: "The popular web browser now allows BAT transfers to self-custody Solana wallets—and the team hasn't ruled out other blockchain integrations.",
        link: "https://decrypt.co/218813/brave-browser-bat-rewards-solana-on-chain-transfer",
      },
      {
        date: "Feb 11",
        headline:
          "Brave Browser Taps Solana for BAT Rewards Despite Blockchain Outages",
        text: "Brave Browser embarks on a new era by integrating Solana blockchain for its BAT payouts, prioritizing high transaction speed and low fees despite...",
        link: "https://www.theblock.co/post/278797/farcaster-solana?utm_source=rss&utm_medium=rss",
      },
      {
        date: "Feb 1",
        headline:
          "Social media platform Farcaster ships support for Solana addresses",
        text: "Farcaster has shipped support for Solana, incorporating the blockchain’s addresses for verifying users.",
        link: "https://beincrypto.com/brave-browser-solana-bat-rewards-blockchain-outages/",
      },
      {
        date: "Jan 20",
        headline:
          "Solana developer platform Helius raises $9.5 million in Series A funding",
        text: "Helius plans to grow its team of 14 employees and bolster its tech stack with the fresh Series A financing.",
        link: "https://www.theblock.co/post/278441/solana-developer-platform-helius-raises-9-5-million-in-series-a-funding?utm_source=rss&utm_medium=rss",
      },
    ],
  },
  {
    name: "XRP",
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
    newsItems: [
      {
        date: "Feb 18",
        headline:
          "Ripple (XRP) Price Reclaims Long-Term Support Level: Is a Breakout Imminent?",
        text: "The XRP price reached a weekly close above a long-term support trend line that had existed for 460 days.The post Ripple (XRP) Price Reclaims Long-...",
        link: "https://beincrypto.com/xrp-price-long-term-support-level-analysis/",
      },
      {
        date: "Fab 1",
        headline:
          "Ripple (XRP) Price Returns to Pivotal Support — Will It Sink or Swim?",
        text: "The XRP price trend will be confirmed as bullish if the price closes above the $0.54 support.The post Ripple (XRP) Price Returns to Pivotal Support — W...",
        link: "https://www.coindesk.com/policy/2024/02/13/ripple-to-buy-new-york-crypto-trust-company-to-expand-us-options/?utm_medium=referral&utm_source=rss&utm_campaign=headlines",
      },
      {
        date: "Jan 23",
        headline:
          "Ripple to Buy New York Crypto Trust Company to Expand U.S. Options",
        text: "Ripple struck a deal to acquire Standard Custody & Trust Co., the company said Tuesday, in order to secure a New York trust charter in an ongoing...",
        link: "https://beincrypto.com/xrp-price-hold-support/",
      },
      {
        date: "Jan 1",
        headline:
          "This Week in Coins: Ethereum Takes Another Week of Losses, XRP Soars",
        text: "ETH is down 19% since the merge. XRP ballooned this week when news broke that the SEC's lawsuit against Ripple may soon come to a conclusion.",
        link: "https://decrypt.co/110431/this-week-in-coins-ethereum-takes-another-week-of-losses-xrp-soars",
      },
    ],
  },
];

const newsItems = [];

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
