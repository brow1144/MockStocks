import mongoose from "mongoose";
import {gameSchema} from "./MongooseSchemas";

export const gameModel = mongoose.model('Game', gameSchema);
