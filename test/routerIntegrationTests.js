const supertest = require('supertest');
const app = require('./app');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const api = supertest(app);

describe('Integration tests for routers', () => {
  it('Debería devolver una página de inicio al acceder a "/"', (done) => {
    api.get('/')
      .expect(302) // Redirección temporal
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header['location']).to.equal('/login');
        done();
      });
  });

  it('Debería redireccionar al usuario al panel de control si está autenticado al acceder a "/"', (done) => {
    api.get('/')
      .set('Cookie', ['connect.sid=your_session_cookie']) 
      .expect(302) // Redirección temporal
      .end((err, res) => {
        if (err) return done(err);
        expect(res.header['location']).to.equal('/dashboard');
        done();
      });
  });

  
});
