import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/SequelizeUsers';
import { Response } from 'superagent';
import { adminUser, token } from './mocks/user.mock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test User functions behavior', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('Test login behavior', () => {
    it('Test login sucessfull', async () => {
      sinon.stub(UserModel, 'findOne').resolves(adminUser as any);
      sinon.stub(JWT, 'sign').returns('valid token')

      const { status, body } = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });

      expect(status).to.equal(200);
      expect(body).to.deep.equal({ token: 'valid token'});
    }); 
  }); 
  describe('Test getRole behavior', () => {
    it('Test getRole using invalid token', async () => {
      const { status, body } = await chai.request(app).get('/login/role')
      .set('authorization', 'token magico')
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token must be a valid token'});
    })
  })
}); 
