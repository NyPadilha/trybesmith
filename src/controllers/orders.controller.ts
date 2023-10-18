import { Request, Response } from 'express';
import ordersService from '../services/orders.service';

const getOrders = async (_req: Request, res: Response): Promise<void> => {
  const result = await ordersService.getOrders();
  res.status(result.status).json(result.data);
};

export default {
  getOrders,
};