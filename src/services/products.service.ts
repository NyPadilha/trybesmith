import { Optional } from 'sequelize/types';
import httpStatus from '../utils/mapHTTPstatus';
import ProductModel from '../database/models/product.model';
import { Service } from '../types/Service';
import { Product } from '../types/Product';

const createProduct = async (product: Optional<Product, 'id'>):Promise<Service> => {
  const newProduct = await ProductModel.create(product);
  return { status: httpStatus.CREATED, data: newProduct.dataValues };
};

const getProducts = async ():Promise<Service> => {
  const products = await ProductModel.findAll();
  return { status: httpStatus.SUCCESSFUL, data: products };
};

export default {
  createProduct,
  getProducts,
};