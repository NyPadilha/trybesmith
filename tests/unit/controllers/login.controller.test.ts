import chai, { expect } from 'chai';
import { stub, restore } from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginController from '../../../src/controllers/login.controller';
import loginService from '../../../src/services/login.service';
import {
  loginSuccessfulService,
} from '../../mocks/login.mock';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = stub().returns(res);
    res.json = stub().returns(res);
    restore();
  });

  it('should login', async function () {
    stub(loginService, 'login').resolves(loginSuccessfulService);

    req.body = {
      username: 'username',
      password: 'password',
    };

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(loginSuccessfulService.data);
  });

});
