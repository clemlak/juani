require('dotenv').config();
const Binance = require('./binance');

const binance = new Binance(process.env.API_KEY, process.env.SECRET_KEY);

binance.getPriceTicker('XMRETH')
  .then((price) => {
    console.log('Ticker price', price);
  })
  .catch((err) => {
    console.log(err);
  });

binance.getBookTicker('XMRETH')
  .then((price) => {
    console.log('Book ticker', price);
  })
  .catch((err) => {
    console.log(err);
  });

binance.createOrderTest('XMRETH', 1, 'BUY', 'LIMIT', 10)
  .then((price) => {
    console.log('Book ticker', price);
  })
  .catch((err) => {
    console.log(err);
  });
