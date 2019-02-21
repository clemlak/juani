const axios = require('axios');
const crypto = require('crypto');
const qs = require('querystring');

class Binance {
  constructor(apiKey, secretKey) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
    this.endpoint = 'https://api.binance.com';
  }

  getPriceTicker(symbol) {
    return axios({
      url: `${this.endpoint}/api/v3/ticker/price`,
      method: 'get',
      params: {
        symbol,
      },
    })
      .then(res => res.data)
      .catch(err => err);
  }

  getBookTicker(symbol) {
    return axios({
      url: `${this.endpoint}/api/v3/ticker/bookTicker`,
      method: 'get',
      params: {
        symbol,
      },
    })
      .then(res => res.data)
      .catch(err => err);
  }

  createOrderTest(symbol, price, side, type, quantity) {
    const timestamp = Date.now();
    const recvWindow = 5000;
    const timeInForce = 'GTC';

    const params = {
      symbol,
      price,
      side,
      type,
      quantity,
      timestamp,
      recvWindow,
      timeInForce,
    };

    const query = qs.stringify(params);
    const signature = crypto.createHmac('sha256', this.secretKey).update(query).digest('hex');

    return axios({
      url: `${this.endpoint}/api/v3/order/test`,
      method: 'post',
      headers: {
        'X-MBX-APIKEY': this.apiKey,
      },
      params: {
        symbol,
        price,
        side,
        type,
        quantity,
        timestamp,
        recvWindow,
        timeInForce,
        signature,
      },
    })
      .then(res => res.data)
      .catch(err => err);
  }
}

module.exports = Binance;
