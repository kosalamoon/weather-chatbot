import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import { UserModel } from '../models/user.model';
import { JWT_SECRET } from '../utils/config';
import { BadRequestError, ConflictError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger';

export const login = async (username: string, password: string) => {
    const user = await UserModel.findOne({ username });
    if (!user) {
        throw new NotFoundError('User not found');
    }
    logger.debug('User found', { ...user, password: undefined });

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        throw new BadRequestError('Invalid password');
    }

    const token = jsonwebtoken.sign({ username }, JWT_SECRET, { expiresIn: '12h' });
    return token;
};

export const register = async (username: string, password: string) => {
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        await UserModel.create({ username, password: hashedPassword });
        logger.info('User created successfully');
    } catch (error) {
        if (error.code === 11000) {
            throw new ConflictError('Username already exists');
        }
        throw error;
    }
};
