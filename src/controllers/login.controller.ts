import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  const user = await loginService.login(username, password);
  res.status(user.status).json(user.data);
};

export default {
  login,
};