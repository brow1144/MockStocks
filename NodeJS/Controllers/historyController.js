import schedule from 'node-schedule';
import {getAllUsers, updateValueHistory, clearValueHistory} from '../Models/userDAO';
import {getStockBatch} from '../Models/stockDAO';

export async function runSchedulers() {
  let ownedStocks = [];
  let stockMap = [];

  try {
    let allUsers = await getAllUsers();

    for (let i in allUsers) {
      if (allUsers.hasOwnProperty(i)) {
        let user = allUsers[i].toObject();

        for (let j in user.active_games) {
          if (user.active_games.hasOwnProperty(j)) {
            let game = user.active_games[j];
            let stockString = '';
            let stocksInGame = [];

            for (let k in game.stocks) {
              if (game.stocks.hasOwnProperty(k)) {
                let exists = stockMap.some((stock) => {
                  return stock.name === game.stocks[k].name;
                });

                if (!exists) {
                  if (stockString.length === 0)
                    stockString += game.stocks[k].name;
                  else
                    stockString += ', ' + game.stocks[k].name;

                  stocksInGame.push({
                    name: game.stocks[k].name,
                    quantity: game.stocks[k].quantity,
                    price: 0
                  });
                } else {
                  stocksInGame.push({
                    name: game.stocks[k].name,
                    quantity: game.stocks[k].quantity,
                    price: stockMap.find((stock) => stock.name === game.stocks[k].name).price
                  });
                }
              }
            }

            if (stockString.length > 0) {
              let data = await getStockBatch(stockString);

              for (let k in data.stockQuotes) {
                if (data.stockQuotes.hasOwnProperty(k)) {
                  //TODO CHANGE THIS WHEN THE API CHANGES
                  let stockObj = {
                    name: data.stockQuotes[k]['1. symbol'],
                    price: parseFloat(parseFloat(data.stockQuotes[k]['2. price']).toFixed(2))
                  };

                  stockMap.push(stockObj);
                  stocksInGame.find((stock) => stock.name === stockObj.name).price = stockObj.price;
                }
              }
            }

            let totalValue = 0;
            for (let k in stocksInGame) {
              if (stocksInGame.hasOwnProperty(k))
                totalValue += stocksInGame[k].quantity * stocksInGame[k].price;
            }
            totalValue += game.buying_power;

            console.log(totalValue);

            // update database
            //updateValueHistory(user._id, game.code, totalValue, Date.now());

            // clear history for testing
            clearValueHistory(user._id, game.code);

          // end of game
          }
        }

      // end of user
      }
    }

    //console.log(stockMap);
  } catch (error) {
    console.log(error);
  }

  // update portofolio values every weekday at 9:30 am
  let marketOpen = schedule.scheduleJob('30 09 * * 1-5', async () => {

  });

  // update portofolio values every weekday at 4:00 pm
  let marketClose = schedule.scheduleJob('00 16 * * 1-5', () => {

  });
};
