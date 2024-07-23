import { WeatherApiResponse } from '../types';
import { WEATHER_API_KEY } from '../utils/config';
import { InternalServerError } from '../utils/errors';
import { logger } from '../utils/logger';

export const getWeatherDetails = async (location: string) => {
    try {
        const data: WeatherApiResponse = await fetch(
            `http://api.weatherapis.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${location}&days=14`
        ).then((res) => res.json());
        logger.info('Weather details fetched successfully');
        logger.debug('Weather details', data);
        return data.forecast.forecastday;
    } catch (error) {
        throw new InternalServerError('Failed to fetch weather details', error);
    }
};
