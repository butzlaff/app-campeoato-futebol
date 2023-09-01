import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Matches } from './mocks/matches.mock';
import MatchModel from '../database/models/SequelizeMatches';
import TeamModel from '../database/models/SequelizeTeam';
import { Teams } from './mocks/team.mock';
import { resultByAway, resultByBoth, resultByHome } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test Leaderboards routes behavior', () => {
  beforeEach(() => {
    sinon.restore();
  });
  describe('Test Leaderboards functions behavior',() => {
  it('Test findAll behavior if route is /home', async() => {

    sinon.stub(MatchModel, 'findAll').resolves(Matches as any);
    sinon.stub(TeamModel, 'findAll').resolves(Teams as any);

    const { status, body } = await chai.request(app).get('/leaderboard/home')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultByHome);
  })
  it('Test findAll behavior if route is /away', async() => {

    sinon.stub(MatchModel, 'findAll').resolves(Matches as any);
    sinon.stub(TeamModel, 'findAll').resolves(Teams as any);

    const { status, body } = await chai.request(app).get('/leaderboard/away')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultByAway);
  })
  it('Test findAll behavior if route is /', async() => {

    sinon.stub(MatchModel, 'findAll').resolves(Matches as any);
    sinon.stub(TeamModel, 'findAll').resolves(Teams as any);

    const { status, body } = await chai.request(app).get('/leaderboard')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(resultByBoth);
  })
})
})