///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
import * as pet from '../fixtures/pet.json';
//let petId;

pet.id = parseInt(faker.random.numeric(5));
pet.name = faker.animal.crocodilia.name;
pet.category.id = parseInt(faker.random.numeric(3));
pet.category.name = faker.animal.type();


describe('Pet suite', () => {

  it('Pet creation', () => {
    cy.log('Create pet')
    cy.request('POST', '/pet', pet).then(response => {
      console.log(response);
// потрібно, якщо потрібні логи
      //cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
      //cy.log(`Request headers: ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`);
      //cy.log(`Request Url: ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`);

      //Для перевірки стату коду потрібно вибирати один з цих методів, всі три не обов'язково перевіряти
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.eq('OK');
      expect(response.isOkStatusCode).to.be.true;
      //expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
      //petId = response.body.id;
    })
 })
    it('Pet creation', () => {
    cy.log('Create pet')
    cy.request('GET', `/pet/${pet.id}`, pet).then(response => {
      console.log(response);
// потрібно, якщо потрібні логи
      //cy.log(`Request body: ${response.allRequestResponses[0]["Request Body"]}`);
      //cy.log(`Request headers: ${JSON.stringify(response.allRequestResponses[0]["Request Headers"])}`);
      //cy.log(`Request Url: ${JSON.stringify(response.allRequestResponses[0]["Request URL"])}`);

      //Для перевірки стату коду потрібно вибирати один з цих методів, всі три не обов'язково перевіряти
      expect(response.status).to.be.equal(200);
      expect(response.statusText).to.be.eq('OK');
      expect(response.isOkStatusCode).to.be.true;
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
    })
  })
})