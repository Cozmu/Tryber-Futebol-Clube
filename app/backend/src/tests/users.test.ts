import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { userMock, tokenModel } from './mocks/users.mock';
import UserModel from '../database/models/Users.model';
import * as jwt from 'jsonwebtoken'

chai.use(chaiHttp);

const { expect } = chai;

describe('Cobrir rota /login com metodo post', () => {
  let chaiHttpResponse:Response;
  it('Verifica se através da rota /login sem email na requisição não e possível fazer login', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login').send({ "password": "secret_user" });

    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    expect(chaiHttpResponse.status).to.be.equal(400);
  });

  it('Verifica se através da rota /login sem password na requisição não e possível fazer login', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login').send({ "email": "user@user.com" });

    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
    expect(chaiHttpResponse.status).to.be.equal(400);
  });

  it('Verifica se através da rota /login com password com menos de 6 caracteres na requisição não e possível fazer login', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login').send({
      "email": "user@user.com",
      "password": "x"
    });

    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
    expect(chaiHttpResponse.status).to.be.equal(401);
  })

  it('Verifica se através da rota /login com password invalido na requisição não e possível fazer login', async () => {
    sinon
      .stub(UserModel, 'findOne')
      .resolves(userMock as UserModel);
    
    chaiHttpResponse = await chai.request(app).post('/teams');
    
    chaiHttpResponse = await chai.request(app)
    .post('/login').send({
      "email": "user@user.com",
      "password": "xxxxxxxxxx"
    });

    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
    expect(chaiHttpResponse.status).to.be.equal(401);
  })

  it('Verifica se através da rota /login com email de formato incorreto na requisição não e possível fazer login', async () => {
    chaiHttpResponse = await chai.request(app)
    .post('/login').send({
      "email": "useruser.com",
      "password": "secret_user"   
    });

    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
    expect(chaiHttpResponse.status).to.be.equal(401);
  })

  it('Verifica se através da rota /login com email invalido na requisição não e possível fazer login', async () => {
    sinon
      .stub(UserModel, 'findOne')
      .resolves(null);
    
    chaiHttpResponse = await chai.request(app).post('/teams');
    
    chaiHttpResponse = await chai.request(app)
    .post('/login').send({
      "email": "jorge@jorge.com",
      "password": "secret_user"
    });

    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Invalid email or password' });
    expect(chaiHttpResponse.status).to.be.equal(401);
  })

  it('Verifica se através da rota /login e possível fazer login', async () => {
    sinon
      .stub(UserModel, 'findOne')
      .resolves(userMock as UserModel);
    
    chaiHttpResponse = await chai.request(app).post('/teams');
    
    chaiHttpResponse = await chai.request(app)
    .post('/login').send({
      "email": "user@user.com",
      "password": "secret_user"
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
  })

  afterEach(() => {
    sinon.restore();
  });
});

describe('Cobrir rota /login/role com metodo get', () => {
  let chaiHttpResponse:Response;
  it('Verifica se nao e possível acessar /login/role com token invalido', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/role').set('Authorization', 'xxx');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
  });  

  it('Verifica se nao e possível acessar /login/role sem token', async () => {
    chaiHttpResponse = await chai.request(app)
    .get('/login/role');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
  });

  it('Verifica se e possível acessar /login/role', async () => {
    sinon
    .stub(jwt, 'verify')
    .resolves(userMock);

    chaiHttpResponse = await chai.request(app).get('/login/role')
    .set('Authorization', tokenModel);

    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'user' });
    expect(chaiHttpResponse.status).to.be.equal(200);
  });  

  afterEach(() => {
    sinon.restore();
  });
});