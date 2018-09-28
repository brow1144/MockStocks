import mongoose from "mongoose";

export const gameSchema = new mongoose.Schema({
  code: String,
  game_name: String,
  leader_email: String,
  starting_amount: Number,
  trade_limit: Number,
  start_time: Date,
  end_time: Date,
  active_players: Array
});

export const userSchema = new mongoose.Schema({
  _id: String,
  active_games: Array,
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
