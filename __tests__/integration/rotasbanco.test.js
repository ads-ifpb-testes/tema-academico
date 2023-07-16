const request = require('supertest');
const app = require('../../api/api');
const mongoose = require('mongoose');
const { TurmaModel } = require('../../src/models/TurmaModel');
const { ProfessorModel } = require('../../src/models/ProfessorModel');
const { AlunoModel } = require('../../src/models/AlunoModel');
const api = require('../../api/api');


describe("Integração com o banco de dados", () => {

    beforeAll(done => {
        done()
    });

    it('Deve retornar os dados das turmas', () => {

        const turmaMock = [{
            rotulo: '123',
            periodo: '2023.1',
            professor: ['Fulano'],
            alunos: ['Fulanos']
        }];

        jest.spyOn(TurmaModel, 'find').mockReturnValue(Promise.resolve(turmaMock));

        return request(app.use(api)).get('/api/v1/turmas').set('Accept', 'application/json').then((response => {
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
        }));
    });


    it('Deve retornar os dados dos professores', async () => {

        const professoresMock = {
            matricula: '123',
            nome: 'Paulo',
            email: 'bajhjdnakms@gmail.com',
            telefone: '78412131'
        };

        jest.spyOn(ProfessorModel, 'find').mockReturnValue(Promise.resolve(professoresMock));

        return request(app.use(api)).get('/api/v1/professores').set('Accept', 'application/json').then((response => {
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
        }));

    });

    it('Deve retornar os dados dos alunos', async () => {
        const alunosMock = [{
            matricula: '56412',
            nome: 'Pedro',
            email: 'bajhjdnakms@gmail.com',
            telefone: '78412131'
        }];

        jest.spyOn(AlunoModel, 'find').mockReturnValue(Promise.resolve(alunosMock));

        return request(app.use(api)).get('/api/v1/alunos').set('Accept', 'application/json').then((response => {
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
        }));

    });

    afterAll(done => {
        mongoose.connection.close();
        done()
    });
});