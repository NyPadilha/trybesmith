import { expect } from 'chai';
import { restore, stub } from 'sinon';
import productsService from '../../../src/services/products.service';
import productsModel from '../../../src/database/models/product.model';
import { Product } from '../../../src/types/Product';
import { Optional } from 'sequelize';
import { createdProduct } from '../../mocks/products.mock';

describe('ProductsService', function () {
  beforeEach(function () { restore(); });
  it('should create a product', async function () {
    const createdProductMock = productsModel.build(createdProduct)
    stub(productsModel, 'create').resolves(createdProductMock);

    const newProduct: Optional<Product, 'id'> = {
      name: 'product', 
      price: "10",
      orderId: 1,
    };

    const result = await productsService.createProduct(newProduct);

    expect(result).to.have.property('status').to.be.equal(201);
    expect(result).to.have.property('data').to.be.deep.equal(createdProduct);
  });
  it('should get all products', async function () {
    const productsMock = productsModel.build(createdProduct)
    stub(productsModel, 'findAll').resolves([productsMock]);

    const result = await productsService.getProducts();

    expect(result).to.have.property('status').to.be.equal(200);
    expect(result).to.have.property('data').to.be.deep.equal([productsMock]);
  });

});
