import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Coins = () => {
  const [coins, setcoins] = useState([]);
  const [currency, setcurrency] = useState("inr");
  const [error, setError] = useState(null); 

  const [serach,setserch] = useState('')
  const currencysymbol = currency === "inr" ? "₹" : "$";
  useEffect(() => {
    const getCryptoCompareList = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setcoins(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    getCryptoCompareList();
  }, [currency]);

  const handlecurrency = (newcurrnecy) => {
    setcurrency(newcurrnecy);
  };
  return (
    <>

<div className="relative bottom-8 left-64 mx-10 px-48  hidden md:block">
  <input 
    type="text" 
    placeholder="Search coins" 
    className=" w-[300px] rounded text-black" 
    value={serach} 
    onChange={(e) => setserch(e.target.value)} 
  />
</div>


      <div className="flex gap-10">
        <button
          className="  lg: w-20 h-10 bg-orange-600 text-white text-2xl font-medium hover:bg-orange-500 cursor-pointer m-10 rounded"
          onClick={() => handlecurrency("usd")}
        >
          USD
        </button>
        <button
          className=" lg: w-20 h-10 bg-orange-600 text-white text-2xl font-medium hover:bg-orange-500 cursor-pointer rounded m-10"
          onClick={() => handlecurrency("inr")}
        >
          INR
        </button>
      </div>
      {coins.filter((data)=>{
        if(data==''){
          return data
        }else if(data.name.toLowerCase().includes(serach.toLocaleLowerCase())){
          return data
        }
      }).map((coindata, index) => {
        return (
          <Coincart
            coindata={coindata}
            index={index}
            id={coindata.id}
            currencysymbol={currencysymbol}
          />
        );
      })}
    </>
  );
};

const Coincart = ({ currencysymbol, coindata, index, id }) => {
  const profit = coindata.price_change_percentage_24h > 0;
  return (
    <Link to={`/coins/${id}`}>
      <div
        className="flex justify-between items-center p-4 lg:p-10 w-full"
        key={index}
      >
        <div className="flex items-center gap-2 lg:gap-4 w-1/3">
          <img
            src={coindata.image}
            alt="logo"
            className="w-12 h-12 lg:w-20 lg:h-20"
          />
          <div className="font-medium text-lg lg:text-xl     whitespace-nowrap overflow-hidden text-ellipsis">
            <p className="truncate">{coindata.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-center text-lg lg:text-xl whitespace-nowrap w-1/3 text-center">
          <p>
            {currencysymbol} {coindata.current_price.toFixed(2)}
          </p>
        </div>

        <div
          style={profit ? { color: "green" } : { color: "red" }}
          className="flex items-center justify-center text-lg lg:text-xl whitespace-nowrap w-1/3 text-center"
        >
          <p>
            {profit
              ? "+" + coindata.price_change_percentage_24h.toFixed(2)
              : coindata.price_change_percentage_24h.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Coins;
