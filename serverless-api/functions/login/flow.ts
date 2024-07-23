import { login } from '../../services/user.service';
import { Handler } from '../../types';
import { apiResponse } from '../../utils';

type LoginBody = {
    username: string;
    password: string;
};

export const flow: Handler<LoginBody> = async (event, context) => {
    const { username, password } = event.body;
    const token = await login(username, password);
    return apiResponse(200, { token });
};
