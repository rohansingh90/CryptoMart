import React, { useEffect, useState } from "react";

const Exchanges = () => {
  const [exchanges, setchanges] = useState([]);
  useEffect(() => {
    const getdata = async () => {
      try {
        const data = await fetch("https://api.coingecko.com/api/v3/exchanges");
        const reslut = await data.json();

        setchanges(reslut);
        // console.log(reslut);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  }, []);
  return (
    <>
      {exchanges.map((items, index) => {
        return (
          <div
            className="flex justify-between items-center p-4 lg:p-10 w-full"
            key={index}
          >
            <div className="flex items-center gap-2 lg:gap-4 w-1/3">
              <img
                src={items.image}
                alt="logo"
                className="w-12 h-12 lg:w-20 lg:h-20"
              />
              <div className="font-medium text-lg lg:text-xl     whitespace-nowrap overflow-hidden text-ellipsis">
                <p className="truncate">{items.name}</p>
              </div>
            </div>

            <div className="flex items-center justify-center text-lg lg:text-xl whitespace-nowrap w-1/3 text-center">
              <p>{items.trade_volume_24h_btc.toFixed(2)}</p>
            </div>

            <div className="flex items-center justify-center text-lg lg:text-xl whitespace-nowrap w-1/3 text-center">
              <p>{items.trust_score_rank}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Exchanges;
