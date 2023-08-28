import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamModel from '../database/models/SequelizeTeam';
import { Response } from 'superagent';
import { Teams } from './mocks/team.mock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Teams routes behavior', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('Test Teams functions behavior', () => {
    it('Test findAll sucessfull', async () => {
      sinon.stub(TeamModel, 'findAll').resolves(Teams as any);
      // sinon.stub(JWT, 'sign').returns('valid token')

      const { status, body } = await chai.request(app).get('/teams');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(Teams);
    }); 
  }); 
})