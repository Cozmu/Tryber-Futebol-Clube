import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as jwt from 'jsonwebtoken'
import { jwtResult, tokenModel } from './mocks/users.mock'
import { Response } from 'superagent';
import MatchesModel from '../database/models/Matchers.model';
import { 
  matches, 
  matchesInProgress, 
  matchesFinished, 
  checkExist, 
  matcheInvalid,
  awayTeam,
  homeTeam,
  resultMatcher,
} from './mocks/matches.mock';
import TeamsModel from '../database/models/Teams.model';


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
    expect(chaiHttpResponse.body).to.be.deep.equal([
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeamId": 9,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      },
      {
        "id": 3,
        "homeTeamId": 4,
        "homeTeamGoals": 3,
        "awayTeamId": 11,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Corinthians"
        },
        "awayTeam": {
          "teamName": "Napoli-SC"
        }
      },
      {
        "id": 4,
        "homeTeamId": 3,
        "homeTeamGoals": 0,
        "awayTeamId": 2,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Botafogo"
        },
        "awayTeam": {
          "teamName": "Bahia"
        }
      },
      {
        "id": 5,
        "homeTeamId": 7,
        "homeTeamGoals": 1,
        "awayTeamId": 10,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "Minas Brasília"
        }
      },
      {
        "id": 6,
        "homeTeamId": 5,
        "homeTeamGoals": 1,
        "awayTeamId": 13,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Cruzeiro"
        },
        "awayTeam": {
          "teamName": "Real Brasília"
        }
      },
      {
        "id": 7,
        "homeTeamId": 12,
        "homeTeamGoals": 2,
        "awayTeamId": 6,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Palmeiras"
        },
        "awayTeam": {
          "teamName": "Ferroviária"
        }
      },
      {
        "id": 8,
        "homeTeamId": 15,
        "homeTeamGoals": 0,
        "awayTeamId": 1,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São José-SP"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      },
      {
        "id": 9,
        "homeTeamId": 1,
        "homeTeamGoals": 0,
        "awayTeamId": 12,
        "awayTeamGoals": 3,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Avaí/Kindermann"
        },
        "awayTeam": {
          "teamName": "Palmeiras"
        }
      },
      {
        "id": 10,
        "homeTeamId": 2,
        "homeTeamGoals": 0,
        "awayTeamId": 9,
        "awayTeamGoals": 2,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Bahia"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
    ]);
  });

  it('Verifique se ao acessar /matches?inProgress=true so e listado times estao com a partida em progresso', async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(matchesInProgress as unknown as MatchesModel[]);


    chaiHttpResponse = await chai.request(app)
      .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal([
      {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 42,
        "homeTeamId": 6,
        "homeTeamGoals": 1,
        "awayTeamId": 1,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Ferroviária"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      },
      {
        "id": 43,
        "homeTeamId": 11,
        "homeTeamGoals": 0,
        "awayTeamId": 10,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Napoli-SC"
        },
        "awayTeam": {
          "teamName": "Minas Brasília"
        }
      },
      {
        "id": 44,
        "homeTeamId": 7,
        "homeTeamGoals": 2,
        "awayTeamId": 15,
        "awayTeamGoals": 2,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "São José-SP"
        }
      },
      {
        "id": 45,
        "homeTeamId": 5,
        "homeTeamGoals": 1,
        "awayTeamId": 3,
        "awayTeamGoals": 1,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Cruzeiro"
        },
        "awayTeam": {
          "teamName": "Botafogo"
        }
      },
    ]);
  });

  it('Verifique se ao acessar /matches?inProgress=false so e listado times estao com a partida que ja foram encerradas', async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(matchesFinished as unknown as MatchesModel[]);


    chaiHttpResponse = await chai.request(app)
      .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal([
      {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 2,
        "homeTeamId": 9,
        "homeTeamGoals": 1,
        "awayTeamId": 14,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Internacional"
        },
        "awayTeam": {
          "teamName": "Santos"
        }
      },
      {
        "id": 3,
        "homeTeamId": 4,
        "homeTeamGoals": 3,
        "awayTeamId": 11,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Corinthians"
        },
        "awayTeam": {
          "teamName": "Napoli-SC"
        }
      },
      {
        "id": 4,
        "homeTeamId": 3,
        "homeTeamGoals": 0,
        "awayTeamId": 2,
        "awayTeamGoals": 0,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Botafogo"
        },
        "awayTeam": {
          "teamName": "Bahia"
        }
      },
      {
        "id": 5,
        "homeTeamId": 7,
        "homeTeamGoals": 1,
        "awayTeamId": 10,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "Flamengo"
        },
        "awayTeam": {
          "teamName": "Minas Brasília"
        }
      },
    ]);
  });

  afterEach(() => {
    sinon.restore();
  });
});

describe('Cobrir rota /matches/:id com metodo path', () => {
  let chaiHttpResponse:Response;
  it('Verifica se nao e possível acessar a rota /matches/:id sem um token', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1')

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('Verifica se nao e possível acessar a rota /matches/:id sem um token valido', async () => {
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/1').set('Authorization', 'xxx');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
  });

  it('Verifica se nao e possível acessar a rota /matches/:id sem os campos obrigatorios', async () => {
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/1').set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('Verifica se não possível atualizar o placar de uma partida inexistente na rota /matches/:id', async () => {
    sinon
      .stub(MatchesModel, 'findByPk')
      .resolves(null);
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/9999999999999999999').send({ "homeTeamGoals": 3, "awayTeamGoals": 0 })
      .set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body.message).to.be.equal('Match not found');
  }); 

  it('', async () => {
    sinon
      .stub(MatchesModel, 'findByPk')
      .resolves(matcheInvalid as MatchesModel);
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/1').send({ "homeTeamGoals": 3, "awayTeamGoals": 0 })
      .set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Match already finished');
  })

  it('Verifica se e possível acessar a rota /matches/:id e atualizado o placar da partida', async () => {
    sinon
      .stub(MatchesModel, 'findByPk')
      .resolves(checkExist as MatchesModel);
    sinon
      .stub(MatchesModel, 'update')
      .resolves([1]);
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/1').send({ "homeTeamGoals": 3, "awayTeamGoals": 0 })
      .set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.message).to.be.equal('updated scoreboard');
  });

  afterEach(() => {
    sinon.restore();
  });
});

describe('Cobrir rota /matches/:id/finish com metodo path', () => {
  let chaiHttpResponse:Response;
  it('Verifica se nao e possível acessar a rota /matches/:id/finish sem um token', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('Verifica se nao e possível acessar a rota /matches/:id/finish sem um token valido', async () => {
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/1/finish').set('Authorization', 'xxx');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
  });

  it('Verifica se não possível finalizar uma partida inexistente na rota /matches/:id/finish', async () => {
    sinon
      .stub(MatchesModel, 'update')
      .resolves([0]);
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/9999999999999999999/finish')
      .set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body.message).to.be.equal('Match not found or already finished');
  }); 

  it('Verifica se e possível finalizar uma partida na rota /matches/:id/finish', async () => {
    sinon
      .stub(MatchesModel, 'update')
      .resolves([1]);
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/42/finish')
      .set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body.message).to.be.equal('Finished');
  });
  
  afterEach(() => {
    sinon.restore();
  });
});

describe('Cobrir rota /matches com o metodo post', () => {
  let chaiHttpResponse:Response;
  it('Verifica se nao e possível acessar a rota /matches sem um token', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches')

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('Verifica se nao e possível acessar a rota /matches sem um token valido', async () => {
    chaiHttpResponse = await chai.request(app)
      .post('/matches').set('Authorization', 'xxx');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
  });

  it('Verifica se nao e possível acessar a rota /matches os campos obrigatorios', async () => {
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('Verifica se nao e possível acessar a rota /matches os campos obrigatorios', async () => {
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('Verifica se nao e possível acessar a rota /matches os campos obrigatorios', async () => {
    sinon
      .stub(TeamsModel, 'findByPk')
      .resolves(null);
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .send({
        "homeTeamId": 99999999999999, 
        "awayTeamId": 2,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
      .set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
  });

  it('Verifica se nao e possível acessar a rota /matches os times iguais', async () => {
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .send({
        "homeTeamId": 9, 
        "awayTeamId": 9,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
      .set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
  });

  it('Verifica se e possível acessar a rota /matches e adicionar uma nova partida', async () => {
    sinon
      .stub(TeamsModel, 'findByPk')
      .resolves(homeTeam as TeamsModel)
      .resolves(awayTeam as TeamsModel);
    sinon
      .stub(MatchesModel, 'create')
      .resolves(resultMatcher as MatchesModel);
    sinon
      .stub(jwt, 'verify')
      .returns({ data: jwtResult } as unknown as void);
    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .send({
        "awayTeamId": 2,
        "awayTeamGoals": 2,
        "homeTeamGoals": 2,
        "homeTeamId": 1, 
      })
      .set('Authorization', tokenModel);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      "id": 50,
      "awayTeamGoals": 2,
      "awayTeamId": 2,
      "homeTeamGoals": 2,
      "homeTeamId": 1,
      "inProgress": true
    });
  });

  afterEach(() => {
    sinon.restore();
  });
});