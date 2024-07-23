import { connect as mongoConnect } from 'mongoose';
import { MONGO_URI } from './config';
import { logger } from './logger';

let isConnected = false;
export const connectToMongoDb = async () => {
    if (!isConnected) {
        logger.info('connecting to db');
        await mongoConnect(MONGO_URI);
        isConnected = true;
        logger.info('successfully connected to db');
    } else {
        logger.debug('connection already exists');
    }
};
