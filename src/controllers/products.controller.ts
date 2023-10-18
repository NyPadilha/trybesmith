import { Request, Response } from 'express';
import productsService from '../services/products.service';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  const result = await productsService.createProduct(req.body);
  res.status(result.status).json(result.data);
};

const getProducts = async (_req: Request, res: Response): Promise<void> => {
  const result = await productsService.getProducts();
  res.status(result.status).json(result.data);
};

export default {
  createProduct,
  getProducts,
};