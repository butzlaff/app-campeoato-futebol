import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/SequelizeMatches';
import { Response } from 'superagent';
import { Matches } from './mocks/matches.mock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Matches routes behavior', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('Test Match functions behavior', () => {
    it('Test findAll sucessfull', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(Matches as any);
      // sinon.stub(JWT, 'sign').returns('valid token')

      const { status, body } = await chai.request(app).get('/matches');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(Matches);
    }); 
  }); 
})