const request = require('supertest');

jest.setTimeout(40000);

describe('Testes de integração da Aplicação web', () => {

    test('Deve retornar os dados das turmas', async () => {
        const response = await request('https://sistema-academico-lpyb.onrender.com').get('/');
        expect(response.status).toBe(200);
    });
})