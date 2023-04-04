import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import MatchesModel from '../database/models/Matchers.model';
import matches from './mocks/matches.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Cobrir rota /matches com metodo get', () => {
  let chaiHttpResponse:Response;
  it('Verifica se através da rota /matches e possível listar todas as partidas incluindo os nomes dos times que estão participando', async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(matches as unknown as MatchesModel[]);
    
    chaiHttpResponse = await chai.request(app)
    .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(matches);
  });

  afterEach(() => {
    sinon.restore();
  });
});