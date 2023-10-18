import chai, { expect } from 'chai';
import { stub, restore} from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productsService from '../../../src/services/products.service';
import productsController from '../../../src/controllers/products.controller';
import { 
  createdProductService, 
  createdProduct,
  getProductsService,
} from '../../mocks/products.mock';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = stub().returns(res);
    res.json = stub().returns(res);
    restore();
  });
  
  it('should create a product', async function () {
    req.body = {
      name: 'product', 
      price: "10",
      orderId: 1,
    };

    stub(productsService, 'createProduct').resolves(createdProductService);

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(createdProduct);
  });
  it('should get all products', async function () {
    stub(productsService, 'getProducts').resolves(getProductsService);

    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([createdProduct]);
  });

});
