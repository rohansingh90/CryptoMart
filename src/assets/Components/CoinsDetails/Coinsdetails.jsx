import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Coins from "../Coins/Coins";
import { data } from "framer-motion/client";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import Charts from "../Charts/Charts";
const Coinsdetails = () => {
  const { id } = useParams();
  const [currency, setcurrency] = useState("inr");
  const [coin, setcoins] = useState([]);
  useEffect(() => {
    const coinget = async () => {
      try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}`
          );
          const data = await response.json();
          setcoins(data);
      } catch (error) {
        console.log(error);
        
      }
    };
    coinget();
  }, [id]);

  const currencyhandle = (newvalue) => {
    setcurrency(newvalue);
  };

  const profit = coin.market_data?.price_change_percentage_24h > 0;
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10 p-6">
        {/* Coin Details Section on the Left */}
        <div className="w-full lg:w-1/2 p-6 rounded-lg shadow-lg">
          <div className="flex gap-10 mb-6">
            <button
              className="w-20 h-10 bg-orange-600 text-white text-2xl font-medium hover:bg-orange-500 cursor-pointer rounded"
              onClick={() => currencyhandle("usd")}
            >
              USD
            </button>
            <button
              className="w-20 h-10 bg-orange-600 text-white text-2xl font-medium hover:bg-orange-500 cursor-pointer rounded"
              onClick={() => currencyhandle("inr")}
            >
              INR
            </button>
          </div>

          <div className="flex items-center mb-10">
            <p className="text-left">
              Last updated on:{" "}
              <span className="font-medium">{coin.last_updated}</span>
            </p>
          </div>

          <div className="flex justify-start mb-4">
            <img
              className="w-24 h-24 lg:w-32 lg:h-32 object-contain"
              src={coin.image?.large}
              alt={coin.name}
            />
          </div>

          <div className="text-left text-xl font-semibold mb-2">
            {coin.name}
          </div>

          <div className="text-left text-2xl font-bold mb-2">
            {currency === "inr"
              ? `₹${coin.market_data?.current_price.inr}`
              : `$${coin.market_data.current_price.usd}`}
          </div>

          <div className="text-left text-lg font-semibold flex items-center text-1xl">
            {profit ? (
              <IoMdArrowDropup color="green" />
            ) : (
              <IoMdArrowDropdown color="red" />
            )}
            {coin.market_data?.price_change_percentage_24h.toFixed(2)}%
          </div>

          <div className="text-left text-sm font-medium p-4 ">
            Rank: {"#" + coin.market_cap_rank}
          </div>
          <div className="text-left text-sm sm:text-base lg:text-lg leading-relaxed sm:leading-normal lg:leading-loose p-2 sm:p-4 lg:p-6">
            {coin.description?.en.split(".")[0]}
          </div>
        </div>

        {/* Chart Section on the Right */}
        <div className="w-full lg:w-1/2">
          <Charts currency={currency} />
        </div>
      </div>
    </>
  );
};

export default Coinsdetails;
