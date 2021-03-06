import { useEffect, useState } from "react";
import "./styles.css";

// Use this API
// https://api2.binance.com/api/v3/ticker/24hr

const COINS = [
  'BTCUSDT ',
  'ETHUSDT',
  'SOLUSDT',
  'ADAUSDT',
  'DOGEUSDT',
]

const COINS_NAMES = {
  BTCUSDT: 'Bitcoin',
  ETHUSDT: 'Ethereum',
  SOLUSDT: 'Solana',
  ADAUSDT: 'Cardano',
  DOGEUSDT: 'DogeCoin',
}


export default function App() {

  const [coinData, setCoinData] = useState([]);

  useEffect(() => {
    fetch('https://api2.binance.com/api/v3/ticker/24hr')
    .then(res => res.json())
    .then(data => {
      const filteredData = data.filter(ticker => {
        if (COINS.includes(ticker.symbol)) {
          return true;
        }
      });
      setCoinData(filteredData);
    });
  }, []) // componet did mount

  console.log(coinData);

  return (
    <div className="App">
      <nav>
        <img
          alt="logo"
          src="https://assets.codepen.io/6060109/crypto-logo-secondary.png"
        />
        <input type="text" placeholder="Search" />
      </nav>
      <div className="main-content">
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
          </tr>
          </thead>
          <tbody>
            {coinData.map((coin, i) => {
                return (
                  <tr key={coin.symbol}>
                    <td>{i+1}</td>
                    <td>{COINS_NAMES[coin.symbol]}</td>
                    <td>${Number(coin.lastPrice).toLocaleString()}</td>
                    <td style={Number(coin.percentChangePercent) > 0 ? { color: "green" } : { color: "red" }}>
                    {
                      Number(coin.percentChangePercent) > 0 
                        ? '▲'
                        : '▼'
                    }
                      ▲
                      {coin.priceChangePercent}%</td>
                  </tr>
                );
             })}
          </tbody>
        </table>
        <div className="bottom-logo-ctr">
          <img
            className="bottom-logo"
            alt="logo"
            src="https://assets.codepen.io/6060109/crypto-logo-primary.png"
          />
        </div>
      </div>
    </div>
  );
}
