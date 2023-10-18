import chai, { expect } from 'chai';
import { stub, restore } from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import ordersService from '../../../src/services/orders.service';
import ordersController from '../../../src/controllers/orders.controller';
import {
  getOrdersService,
} from '../../mocks/orders.mock';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = stub().returns(res);
    res.json = stub().returns(res);
    restore();
  });

  it('should get all orders', async function () {
    stub(ordersService, 'getOrders').resolves(getOrdersService);

    await ordersController.getOrders(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getOrdersService.data);
  });

});
