import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { teams } from './mocks/teams.mock'
import TeamsModel from '../database/models/Teams.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('REQUISITO 2 - Cobrir rota /teams com metodo get', () => {
  let chaiHttpResponse: Response;
  it('Verifica se através da rota /teams, todos os times devem ser retornados', async () => {
    sinon
      .stub(TeamsModel, 'findAll')
      .resolves(teams as TeamsModel[]);
    
    chaiHttpResponse = await chai.request(app).get('/teams');
    
    expect(chaiHttpResponse.body).to.deep.equal([
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      },
      {
        "id": 5,
        "teamName": "Cruzeiro"
      },
      {
        "id": 6,
        "teamName": "Ferroviária"
      },
      {
        "id": 7,
        "teamName": "Flamengo"
      },
      {
        "id": 8,
        "teamName": "Grêmio"
      },
      {
        "id": 9,
        "teamName": "Internacional"
      },
      {
        "id": 10,
        "teamName": "Minas Brasília"
      },
      {
        "id": 11,
        "teamName": "Napoli-SC"
      },
      {
        "id": 12,
        "teamName": "Palmeiras"
      },
      {
        "id": 13,
        "teamName": "Real Brasília"
      },
      {
        "id": 14,
        "teamName": "Santos"
      },
      {
        "id": 15,
        "teamName": "São José-SP"
      },
      {
        "id": 16,
        "teamName": "São Paulo"
      }
    ]);

  });

  afterEach(() => {
    sinon.restore();
  });
});

describe('REQUISITO 5 - Cobrir rota /teams com metodo get pelo id', () => {
  let chaiHttpResponse: Response;
  it('Verifica se através da rota /teams:id, o times do id correspondete devem ser retornados', async () => {
    sinon
      .stub(TeamsModel, 'findByPk')
      .resolves(teams[0] as TeamsModel);
    
    chaiHttpResponse = await chai.request(app).get('/teams/:id');
    
    expect(chaiHttpResponse.body).to.deep.equal(
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    });
    
  });

  afterEach(() => {
    sinon.restore();
  });
});