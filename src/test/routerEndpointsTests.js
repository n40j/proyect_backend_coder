const supertest = require('supertest');
const app = require('./app');
const { describe, it } = require('mocha');
const { expect } = require('chai');

const api = supertest(app);

describe('Endpoint tests for routers', () => {
  it('El endpoint GET /api/products debería devolver una lista de productos', (done) => {
    api.get('/api/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('El endpoint POST /api/carts/add debería agregar un producto al carrito', (done) => {
    api.post('/api/carts/add')
      .send({ productId: 'producto_id', quantity: 2 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('success', true);
        done();
      });
  });

  it('El endpoint POST /api/sessions/login debería iniciar sesión correctamente', (done) => {
    api.post('/api/sessions/login')
      .send({ username: 'usuario_prueba', password: 'contraseña_prueba' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  
});
