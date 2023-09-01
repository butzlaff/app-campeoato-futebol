import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/SequelizeMatches';
import { Matches, newMatch, newMatchResult } from './mocks/matches.mock';
import JWT from '../utils/JWT';
import Validations from '../middlewares/Validate';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Matches routes behavior', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('Test Match functions behavior', () => {
    it('Test findAll is sucessfull', async () => {
      sinon.stub(MatchModel, 'findAll').resolves(Matches as any);
      // sinon.stub(JWT, 'sign').returns('valid token')

      const { status, body } = await chai.request(app).get('/matches');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(Matches);
    });
    it('Test finishMatch is sucessfull', async () => {
      const affectedRow = [{affectedCount: 1}]
      sinon.stub(MatchModel, 'update').resolves(affectedRow as any);
      sinon.stub(JWT, 'verify').returns('valid token');
      sinon.stub(JWT, 'decode').returns({ email: 'admin@admin.com'} as any);

      const { status, body } = await chai.request(app).patch('/matches/1/finish').set('authorization', 'token magico')

      expect(status).to.equal(200);
      expect(body).to.deep.equal({ message: 'Finished' });
    });
    it('Test updateMatchGoals is sucessfull', async () => {
      const affectedRow = [{affectedCount: 1}]
      sinon.stub(MatchModel, 'update').resolves(affectedRow as any);
      sinon.stub(JWT, 'verify').returns('valid token');
      sinon.stub(JWT, 'decode').returns({ email: 'admin@admin.com'} as any);

      const { status, body } = await chai.request(app).patch('/matches/1')
      .set('authorization', 'token magico').send({ awayTeamId: 1, homeTeamId: 2})

      expect(status).to.equal(200);
      expect(body).to.deep.equal({ message: 'Updated' });
    }); 
    it('Test updateMatchGoals trow a error', async () => {
      // const affectedRow = [{affectedCount: 1}]
      sinon.stub(MatchModel, 'update').throwsException('Error');
      sinon.stub(JWT, 'verify').returns('valid token');
      sinon.stub(JWT, 'decode').returns({ email: 'admin@admin.com'} as any);

      const { status, body } = await chai.request(app).patch('/matches/1')
      .set('authorization', 'token magico').send({ awayTeamId: 1, homeTeamId: 2})

      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Error' });
    }); 
    it('Test if is possible create a new Match', async () => {
      sinon.stub(MatchModel, 'create').resolves(newMatchResult as any);
      sinon.stub(JWT, 'verify').returns('valid token');
      sinon.stub(JWT, 'decode').returns({ email: 'admin@admin.com'} as any);

      const { status, body } = await chai.request(app).post('/matches')
      .set('authorization', 'token magico').send(newMatch)

      expect(status).to.equal(201);
      expect(body).to.deep.equal(newMatchResult);
    });    
  }); 
})
