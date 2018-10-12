import mongoose from 'mongoose';
import {gameSchema, userSchema, tickerSchema} from './MongooseSchemas';

export const gameModel = mongoose.model('Game', gameSchema);
export const userModel = mongoose.model('User', userSchema);
export const tickerModel = mongoose.model('Ticker', tickerSchema);
