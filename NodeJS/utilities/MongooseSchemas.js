import mongoose from 'mongoose';

export const gameSchema = new mongoose.Schema({
  _id: String,
  code: String,
  game_name: String,
  leader_email: String,
  starting_amount: Number,
  trade_limit: Number,
  start_time: Date,
  end_time: Date,
  active_players: Array,
  completed: Boolean
});

export const userSchema = new mongoose.Schema({
  _id: String,
  active_games: Array,
  completed_games: Array,
  watchlist: Array,
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  }
});

export const tickerSchema = new mongoose.Schema({
  tickers: Array
});
