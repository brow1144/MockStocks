import mongoose from "mongoose";
import {gameSchema, userSchema} from "./MongooseSchemas";

export const gameModel = mongoose.model('Game', gameSchema);
export const userModel = mongoose.model('User', userSchema);
