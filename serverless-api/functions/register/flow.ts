import { register } from '../../services/user.service';
import { Handler } from '../../types';
import { apiResponse } from '../../utils';

type RegisterBody = {
    username: string;
    password: string;
};

export const flow: Handler<RegisterBody> = async (event, context) => {
    const { username, password } = event.body;
    await register(username, password);
    return apiResponse(201, { message: 'User created' });
};
