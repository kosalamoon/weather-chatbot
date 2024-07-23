import {
    Handler as LambdaHandlerFn,
    APIGatewayProxyResultV2,
    APIGatewayProxyEventV2,
} from 'aws-lambda';

type Event<TBody = any, TQueryParam = any> = Omit<
    APIGatewayProxyEventV2,
    'body' | 'queryStringParameters'
> & {
    body: TBody;
    queryStringParameters: TQueryParam;
};

export type Handler<TBody = any, TQueryParam = any> = LambdaHandlerFn<
    Event<TBody, TQueryParam>,
    APIGatewayProxyResultV2
>;

export interface WeatherApiResponse {
    forecast: {
        forecastday: {
            date: string;
            day: {
                maxtemp_c: number;
                mintemp_c: number;
                avgtemp_c: number;
            };
        }[];
    };
}
