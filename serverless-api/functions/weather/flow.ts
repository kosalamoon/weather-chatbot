import { getWeatherDetails } from '../../services/weather.service';
import { Handler } from '../../types';
import { apiResponse } from '../../utils';

type QueryParam = {
    location: string;
};

export const flow: Handler<undefined, QueryParam> = async (event, context) => {
    const { location } = event.queryStringParameters;
    const weatherDetails = await getWeatherDetails(location);
    return apiResponse(200, weatherDetails);
};
