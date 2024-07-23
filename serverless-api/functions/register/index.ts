import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { z } from 'zod';
import { flow } from './flow';
import {
    connectToDB,
    errorHandler,
    init,
    loggerMiddleware,
    validateEventBody,
} from '../../middlewares';

const registerSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const handler = middy()
    .use(init())
    .use(httpJsonBodyParser())
    .use(loggerMiddleware())
    .use(validateEventBody(registerSchema))
    .use(connectToDB())
    .use(errorHandler())
    .handler(flow as any);