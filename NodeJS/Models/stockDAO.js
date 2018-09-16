import axios from 'axios';

export function getStock(stockTicker) {
    return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${stockTicker}&apikey=WIOGAHD0RJEEZ59V`)
      .then(function (response) {
        // handle success
        let stockData = []
        let data = response.data['Monthly Adjusted Time Series']
        // let data = response.data['Time Series (1min)']

        for (let i in data) {
          stockData.unshift({
            x: new Date(i).getTime(),
            y: parseFloat(data[i]['5. adjusted close']),
            // y: parseFloat(data[i]['4. close']),
          })
        }
        return Promise.resolve(stockData);
      })
      .catch(function (error) {
        console.log(error);
      })
};
