const API_ENV = process.env.API_ENV || 'dev';
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is missing');
}

if (!MONGO_URI) {
    throw new Error('MONGO_URI is missing');
}

if (!WEATHER_API_KEY) {
    throw new Error('WEATHER_API_KEY is missing');
}

export { API_ENV, JWT_SECRET, MONGO_URI, LOG_LEVEL, WEATHER_API_KEY };
