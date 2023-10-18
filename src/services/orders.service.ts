// import { Optional } from 'sequelize/types';
import sequelize from 'sequelize';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
// import { Order } from '../types/Order';
import httpStatus from '../utils/mapHTTPstatus';
import { Service } from '../types/Service';

const getOrders = async ():Promise<Service> => {
  const orders = await OrderModel.findAll({
    include: {
      model: ProductModel,
      as: 'productIds',
      attributes: [],
    },
    raw: true,
    attributes: [
      'id',
      'userId',
      [sequelize.fn('JSON_ARRAYAGG', sequelize.col('productIds.id')), 'productIds'],
    ],
    group: ['id'],
  });

  return { status: httpStatus.SUCCESSFUL, data: orders };
};

export default {
  getOrders,
};