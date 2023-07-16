const request = require('supertest');

jest.setTimeout(40000);


describe('Testes de integração das rotas da API', () => {

    test('Deve retornar os dados das turmas', async () => {
        const response = await request('https://sistema-academico-lpyb.onrender.com/api/v1/api-docs').get('/turmas');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    test('Deve retornar os dados dos professores', async () => {
        const response = await request('https://sistema-academico-lpyb.onrender.com/api/v1/api-docs').get('/professores');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    test('Deve retornar os dados dos alunos', async () => {
        const response = await request('https://sistema-academico-lpyb.onrender.com/api/v1/api-docs').get('/alunos');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});
