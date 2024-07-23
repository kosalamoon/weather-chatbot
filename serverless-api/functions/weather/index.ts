import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { z } from 'zod';
import {
    connectToDB,
    errorHandler,
    init,
    loggerMiddleware,
    validateQueryParams,
    validateToken,
} from '../../middlewares';
import { flow } from './flow';

const queryParamSchema = z.object({
    location: z.string(),
});

export const handler = middy()
    .use(init())
    .use(httpJsonBodyParser())
    .use(loggerMiddleware())
    .use(validateQueryParams(queryParamSchema))
    .use(connectToDB())
    .use(validateToken())
    .use(errorHandler())
    .handler(flow as any);
