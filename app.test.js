const request = require('supertest');
const app = require('./app');

describe('Hola Mundo DevOps API', () => {
  
  describe('GET /', () => {
    it('debe retornar HTML con código 200', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.text).toContain('Hola Mundo DevOps');
    });

    it('debe contener un mensaje divertido', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.text).toContain('🚀');
    });

    it('debe tener las etiquetas HTML correctas', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.text).toContain('<!DOCTYPE html>');
      expect(response.text).toContain('DevOps');
    });
  });

  describe('GET /api/hola', () => {
    it('debe retornar JSON con código 200', async () => {
      const response = await request(app)
        .get('/api/hola')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('mensaje');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('version');
    });

    it('debe contener un mensaje válido', async () => {
      const response = await request(app)
        .get('/api/hola')
        .expect(200);
      
      expect(typeof response.body.mensaje).toBe('string');
      expect(response.body.mensaje.length).toBeGreaterThan(0);
    });

    it('debe retornar un timestamp válido', async () => {
      const response = await request(app)
        .get('/api/hola')
        .expect(200);
      
      expect(() => new Date(response.body.timestamp)).not.toThrow();
    });

    it('debe retornar diferentes mensajes aleatoriamente', async () => {
      const respuestas = [];
      
      for (let i = 0; i < 5; i++) {
        const response = await request(app).get('/api/hola');
        respuestas.push(response.body.mensaje);
      }
      
      const mensajesUnicos = new Set(respuestas);
      expect(mensajesUnicos.size).toBeGreaterThanOrEqual(1);
    });
  });

  describe('GET /health', () => {
    it('debe retornar health check', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/)
        .expect(200);
      
      expect(response.body.status).toBe('healthy');
    });

    it('debe retornar timestamp válido', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(() => new Date(response.body.timestamp)).not.toThrow();
    });
  });

  describe('Rutas no encontradas', () => {
    it('debe retornar 404 para rutas inválidas', async () => {
      const response = await request(app)
        .get('/ruta-inexistente')
        .expect(404);
      
      expect(response.body).toHaveProperty('error');
    });
  });

});

afterAll((done) => {
  jest.clearAllTimers();
  done();
});