import jsonwebtoken from 'jsonwebtoken';
import { maskJSON2 } from 'maskdata';
import { Schema } from 'zod';
import { connectToMongoDb } from '../utils/db';
import { BadRequestError, UnauthorizedError } from '../utils/errors';
import { logger } from '../utils/logger';

export const init = () => ({
    before: (request) => {
        request.context.callbackWaitsForEmptyEventLoop = false;
    },
});

export const validateEventBody = (schema: Schema) => ({
    before: ({ event }) => {
        const { success, data, error } = schema.safeParse(event.body);
        if (!success) {
            throw new BadRequestError('Event body validation error', error.format());
        }
    },
});

export const validateQueryParams = (schema: Schema) => ({
    before: ({ event }) => {
        const { success, data, error } = schema.safeParse(event.queryStringParameters);
        if (!success) {
            throw new BadRequestError('Query param validation error', error.format());
        }
    },
});

export const connectToDB = () => ({
    before: async () => {
        await connectToMongoDb();
    },
});

export const validateToken = () => ({
    before: ({ event }) => {
        const header = event.headers['Authorization'] || event.headers['authorization'];
        if (!header) {
            throw new UnauthorizedError('Authorization header not found');
        }
        const token = header.split(' ')[1];
        if (!token) {
            throw new UnauthorizedError('Token not found');
        }

        try {
            jsonwebtoken.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new UnauthorizedError('Invalid token');
        }
    },
});

export const loggerMiddleware = () => ({
    before: ({ event }) => {
        logger.info(`Request: ${event.routeKey} received`);
        if (event.body) {
            const maskedBody = maskJSON2(event.body, { passwordFields: ['password'] });
            logger.debug('Request body: ', maskedBody);
        }
        if (event.queryStringParameters) {
            logger.debug('Query params: ', event.queryStringParameters);
        }
    },
});

export const errorHandler = () => ({
    onError: ({ error }) => {
        delete error.stack;
        logger.error(error.message, error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ ...error, message: error.message }),
        };
    },
});
