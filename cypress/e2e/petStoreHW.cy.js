///<reference types="cypress"/>
import { faker } from '@faker-js/faker';
import * as pet from '../fixtures/pet.json';

pet.id = parseInt(faker.random.numeric(5));
pet.name = faker.animal.crocodilia.name;
pet.category.id = parseInt(faker.random.numeric(3));
pet.category.name = faker.animal.type();

describe('Pet suite', () => {

  it('Pet creation', () => {
    cy.log('Create pet')
    cy.request('POST', '/pet', pet).then(response => {
      console.log(response);

      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
     
    })
 })
    it('Get pet with id', () => {
    cy.log('Get pet')
    cy.request('GET', `/pet/${pet.id}`, pet).then(response => {
      console.log(response);

      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
    })
  })

  it('Update pet with id', () => {
    cy.log('Update pet')

    pet.name = faker.animal.insect.name;
    pet.category.id = parseInt(faker.random.numeric(3) + 10);
    pet.category.name = faker.vehicle.type();

    cy.request('PUT', '/pet', pet).then(response => {
      console.log(response);

      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
    })

    cy.request('GET', `/pet/${pet.id}`, pet).then(response => {
      console.log(response);

      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(pet.name);
      expect(response.body.category.id).to.be.equal(pet.category.id);
      expect(response.body.category.name).to.be.equal(pet.category.name);
    })
  })

  it('Find pet by status', () => {
    cy.log('Find pet')
    cy.request('GET', `/pet/findByStatus?status=${pet.status}`).then(response => {
      console.log(response);

      expect(response.status).to.be.equal(200);
      expect(response.body.length).to.be.greaterThan(0);

      expect(
        response.body.map(
          pet => ({
            id: pet.id,
            name: pet.name
          })
        ))
        .to.include.deep.members([{
          id: pet.id,
          name: pet.name
        }]);
    })
  })

  it('Update pet with id using form data', () => {
    cy.log('Update pet with form data')

    let params = {
      petId: pet.id,
      name: faker.animal.bear.name,
      status: 'sold'
    }

    cy.request({
      method: 'POST',
      url: `/pet/${pet.id}`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: params,
      form: true
    }).then(response => {
      console.log(response);

      expect(response.status).to.be.equal(200);
    })

    cy.request('GET', `/pet/${pet.id}`, pet).then(response => {
      console.log(response);

      expect(response.status).to.be.equal(200);
      expect(response.body.id).to.be.equal(pet.id);
      expect(response.body.name).to.be.equal(params.name);
      expect(response.body.status).to.be.equal(params.status);
    })
  })

  it('Delete pet with id', () => {
    cy.log('Delete pet')
    cy.request('DELETE', `/pet/${pet.id}`).then(response => {
      console.log(response);

      expect(response.status).to.be.equal(200);
    })

    cy.request({
      method: 'GET', 
      url: `/pet/${pet.id}`, 
      failOnStatusCode: false
    }).then(response => {
    console.log(response);

      expect(response.status).to.be.equal(404);
      expect(response.body.message).to.be.equal('Pet not found');
      	

    })
  })

})

