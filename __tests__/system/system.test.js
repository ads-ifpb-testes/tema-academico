const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { Professor } = require('../../src/models/ProfessorModel');

// Configuração do Selenium WebDriver
const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setChromeOptions(new chrome.Options().headless())
  .build();

// Função auxiliar para preencher e enviar o formulário de cadastro/edição
async function fillAndSubmitForm(matricula, nome, email, telefone) {
  await driver.findElement(webdriver.By.name('matricula')).sendKeys(matricula);
  await driver.findElement(webdriver.By.name('nome')).sendKeys(nome);
  await driver.findElement(webdriver.By.name('email')).sendKeys(email);
  await driver.findElement(webdriver.By.name('telefone')).sendKeys(telefone);
  await driver.findElement(webdriver.By.css('form')).submit();
}

describe('ProfessorController', () => {
  beforeAll(async () => {
    await driver.get('http://localhost:3000/professor/index'); // Altere a URL conforme necessário
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('Deve exibir a página de edição de professor', async () => {
    const pageTitle = await driver.getTitle();
    expect(pageTitle).toBe('Academify');
  });

  it('Deve cadastrar um professor com sucesso', async () => {
    await fillAndSubmitForm('123', 'John Doe', 'johndoe@example.com', '123456789');
    const successMessage = await driver.findElement(webdriver.By.css('.alert-success')).getText();
    expect(successMessage).toBe('Professor cadastrado com sucesso.');
  });

  it('Deve exibir a página de listagem de professores', async () => {
    await driver.get('http://localhost:3000/professor/list'); // Altere a URL conforme necessário
    const pageTitle = await driver.getTitle();
    expect(pageTitle).toBe('Academify');
  });

  it('Deve editar um professor com sucesso', async () => {
    const professores = await Professor.buscaProfessores();
    const lastProfessor = professores[professores.length - 1];
    const professorId = lastProfessor._id;

    await driver.get(`http://localhost:3000/professor/index/${professorId}`); // Altere a URL conforme necessário
    await fillAndSubmitForm('456', 'Jane Doe', 'janedoe@example.com', '987654321');
    const successMessage = await driver.findElement(webdriver.By.css('.alert-success')).getText();
    expect(successMessage).toBe('Professor editado com sucesso.');
  });

  it('Deve excluir um professor com sucesso', async () => {
    const professores = await Professor.buscaProfessores();
    const lastProfessor = professores[professores.length - 1];
    const professorId = lastProfessor._id;

    await driver.get(`http://localhost:3000/professor/delete/${professorId}`); // Altere a URL conforme necessário
    const successMessage = await driver.findElement(webdriver.By.css('.alert-success')).getText();
    expect(successMessage).toBe('Professor apagado com sucesso.');
  });

  it('Deve exibir a página 404 ao tentar editar um professor inexistente', async () => {
    await driver.get('http://localhost:3000/professor/index/nonexistent'); // Altere a URL conforme necessário
    const pageTitle = await driver.getTitle();
    expect(pageTitle).toBe('Erro 404!');
  });

  it('Deve exibir a página 404 ao tentar excluir um professor inexistente', async () => {
    await driver.get('http://localhost:3000/professor/delete/nonexistent'); // Altere a URL conforme necessário
    const pageTitle = await driver.getTitle();
    expect(pageTitle).toBe('Erro 404!');
  });

  it('Deve exibir a página 404 ao acessar uma rota inválida', async () => {
    await driver.get('http://localhost:3000/nonexistent'); // Altere a URL conforme necessário
    const pageTitle = await driver.getTitle();
    expect(pageTitle).toBe('Erro 404!');
  });

  it('Deve exibir a página 404 ao tentar cadastrar um professor sem preencher os campos obrigatórios', async () => {
    await driver.get('http://localhost:3000/professor/index'); // Altere a URL conforme necessário
    await driver.findElement(webdriver.By.css('form')).submit();
    const pageTitle = await driver.getTitle();
    expect(pageTitle).toBe('Erro 404!');
  });

  it('Deve exibir a página 404 ao tentar editar um professor sem preencher os campos obrigatórios', async () => {
    const professores = await Professor.buscaProfessores();
    const lastProfessor = professores[professores.length - 1];
    const professorId = lastProfessor._id;

    await driver.get(`http://localhost:3000/professor/index/${professorId}`); // Altere a URL conforme necessário
    await driver.findElement(webdriver.By.name('matricula')).clear();
    await driver.findElement(webdriver.By.name('nome')).clear();
    await driver.findElement(webdriver.By.name('email')).clear();
    await driver.findElement(webdriver.By.name('telefone')).clear();
    await driver.findElement(webdriver.By.css('form')).submit();
    const pageTitle = await driver.getTitle();
    expect(pageTitle).toBe('Erro 404!');
  });
});
