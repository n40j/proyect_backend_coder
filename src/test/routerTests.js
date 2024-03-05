const { describe, it } = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('./app');

const api = supertest(app);

describe('Router de products', () => {
  it('Debería devolver una lista de productos', (done) => {
    api.get('/api/products')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('Router de carts', () => {
  it('Debería agregar un producto al carrito', (done) => {
    api.post('/api/carts/add')
      .send({ productId: 'producto_id', quantity: 2 })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('success', true);
        done();
      });
  });
});

describe('Router de sessions', () => {
  it('Debería iniciar sesión correctamente', (done) => {
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
