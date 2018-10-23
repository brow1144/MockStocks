import schedule from 'node-schedule';
import {tickerModel} from '../utilities/MongooseModels';
import {getAllUsers, updateValueHistory, clearValueHistory, makeGameInactive} from '../Models/userDAO';
import {getStockBatch, getTickers} from '../Models/stockDAO';
import {completeGame, getAllGames} from "../Models/gameDAO";
import _ from 'lodash';

export function runSchedules() {
  // update portofolio values every weekday at 9:30 am
  let marketOpen = schedule.scheduleJob('30 09 * * 1-5', () => {
    getPortfolioValues();
  });

  // update portofolio values every weekday at 4:00 pm
  let marketClose = schedule.scheduleJob('00 16 * * 1-5', () => {
    getPortfolioValues();
  });

  let clearDailyCounters = schedule.scheduleJob('00 00 * * *', () => {
    clearCounters(true);
  });

  // check active games once per hour
  let checkGames = schedule.scheduleJob('00,30 * * * *', () => {
    checkActiveGames();
  });

  let clearWeeklyCounters = schedule.scheduleJob('00 00 * * 00', () => {
    clearCounters(false);
  });

  // runs every minute for testing purposes
  // let test = schedule.scheduleJob('* * * * *', () => {
  //   checkActiveGames();
  // });
}

export const checkActiveGames = () => {
  getAllGames()
    .then((games) => {
      _.forEach(games, (game) => {
        if (game.end_time < new Date() && !game.completed) {
          _.forEach(game.active_players, (player) => {
            makeGameInactive(player, game);
          });
          completeGame(game.code);
        }

      });
    })
    .catch((err) => {
      console.error(err)
    });
};

export async function getPortfolioValues() {
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

              for (let k in data) {
                if (data.hasOwnProperty(k)) {
                  let stockObj = {
                    name: data[k].quote.symbol,
                    price: data[k].quote.latestPrice
                  };

                  stockMap.push(stockObj);
                  stocksInGame.find((stock) => stock.name === stockObj.name).price = stockObj.price;
                }
              }
            }

            let totalValue = game.buying_power;

            for (let k in stocksInGame) {
              if (stocksInGame.hasOwnProperty(k))
                totalValue += stocksInGame[k].quantity * stocksInGame[k].price;
            }

            // update database
            updateValueHistory(user._id, game.code, parseFloat(totalValue.toFixed(2)), Date.now());

            // clear history for testing
            //clearValueHistory(user._id, game.code);

            // end of game
          }
        }

        // end of user
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export async function clearCounters(daily) {
  let tickers;
  let updateClause;

  try {
    tickers = await getTickers();
    tickers = tickers.toObject().tickers;
  } catch (error) {
    console.log(error);
  }

  if (daily) {
    updateClause = {
      '$set': {'tickers.$.dailyBuyCount': 0}
    };
  } else {
    updateClause = {
      '$set': {'tickers.$.weeklyBuyCount': 0}
    };
  }

  const options = {
    new: true,
    passRawResult: true
  };

  for (let i in tickers) {
    if (tickers.hasOwnProperty(i)) {
      tickerModel.findOneAndUpdate(
        {'tickers.symbol': tickers[i].symbol},
        updateClause,
        options)
        .then((updatedTicker) => {
          if (updatedTicker === null)
            console.log('UserError: Ticker not found');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
