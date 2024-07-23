export class CustomError extends Error {
    statusCode: number;
    status: string;
    error?: any;

    constructor({
        message,
        statusCode = 500,
        status = 'Error',
        error,
    }: {
        message: string;
        statusCode: number;
        status: string;
        error?: any;
    }) {
        super(message);
        this.statusCode = statusCode;
        this.status = status;
        this.error = error;
    }
}

export class BadRequestError extends CustomError {
    constructor(message?: string, error?: any) {
        super({
            message: message || 'Bad Request',
            statusCode: 400,
            status: 'Bad Request',
            error,
        });
    }
}

export class UnauthorizedError extends CustomError {
    constructor(message?: string, error?: any) {
        super({
            message: message || 'Unauthorized',
            statusCode: 401,
            status: 'Unauthorized',
            error,
        });
    }
}

export class ForbiddenError extends CustomError {
    constructor(message?: string, error?: any) {
        super({
            message: message || 'Forbidden',
            statusCode: 403,
            status: 'Forbidden',
            error,
        });
    }
}

export class NotFoundError extends CustomError {
    constructor(message?: string, error?: any) {
        super({
            message: message || 'Not Found',
            statusCode: 404,
            status: 'Not Found',
            error,
        });
    }
}

export class ConflictError extends CustomError {
    constructor(message?: string, error?: any) {
        super({
            message: message || 'Conflict',
            statusCode: 409,
            status: 'Conflict',
            error,
        });
    }
}

export class InternalServerError extends CustomError {
    constructor(message?: string, error?: any) {
        super({
            message: message || 'Internal Server Error',
            statusCode: 500,
            status: 'Internal Server Error',
            error,
        });
    }
}
