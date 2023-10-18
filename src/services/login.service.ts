import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Service } from '../types/Service';
import generate from '../utils/validadeJWT';
import httpStatus from '../utils/mapHTTPstatus';

const login = async (username: string, password: string):Promise<Service> => {
  if (!username || !password) {
    return { 
      status: httpStatus.BAD_REQUEST,
      data: { message: '"username" and "password" are required' }, 
    };
  }

  const user = await UserModel.findOne({ where: { username } });

  const isPasswordCorrect = user && bcrypt.compareSync(password, user.dataValues.password);

  if (!isPasswordCorrect) {
    return { status: httpStatus.UNAUTHORIZED, data: { message: 'Username or password invalid' } };
  }

  const token = generate({
    id: user.dataValues.id,
    username: user.dataValues.username,
  });

  return { status: httpStatus.SUCCESSFUL, data: { token } };
};

export default {
  login,
};