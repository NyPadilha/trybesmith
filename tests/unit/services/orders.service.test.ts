import { expect } from 'chai';
import { stub, restore } from 'sinon';
import ordersService from '../../../src/services/orders.service';
import ordersModel from '../../../src/database/models/order.model';

describe('OrdersService', function () {
  beforeEach(function () { restore(); });

  it('should get all orders', async function () {
    const ordersMock = ordersModel.build({
      id: 1,
      userId: 1,
    });
    stub(ordersModel, 'findAll').resolves([ordersMock]);

    const result = await ordersService.getOrders();

    expect(result).to.have.property('status').to.be.equal(200);
    expect(result).to.have.property('data').to.be.deep.equal([ordersMock]);
  });

});
