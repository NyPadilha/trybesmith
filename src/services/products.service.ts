import { Optional } from 'sequelize/types';
import httpStatus from '../utils/mapHTTPstatus';
import ProductModel from '../database/models/product.model';
import { Service } from '../types/Service';
import { Product } from '../types/Product';

const createProduct = async (product: Optional<Product, 'id'>):Promise<Service<Product>> => {
  const newProduct = await ProductModel.create(product);
  return { status: httpStatus.CREATED, data: newProduct.dataValues };
};

export default {
  createProduct,
};