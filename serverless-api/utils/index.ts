export const apiResponse = (statusCode: number = 200, body: any = {}) => ({
    statusCode,
    body: JSON.stringify(body),
});
