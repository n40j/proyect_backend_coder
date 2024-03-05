const supertest = require('supertest');
const app = require('./app');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const api = supertest(app);

describe('API tests for routers', () => {
  it('Debería devolver una respuesta exitosa al acceder a /api/products', (done) => {
    api.get('/api/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('Debería devolver una respuesta exitosa al acceder a /api/carts/add', (done) => {
    api.post('/api/carts/add')
      .send({ productId: 'producto_id', quantity: 2 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('Debería devolver una respuesta exitosa al acceder a /api/sessions/login', (done) => {
    api.post('/api/sessions/login')
      .send({ username: 'usuario_prueba', password: 'contraseña_prueba' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

});
