import '../../support/commands';
import { Faker, en } from '@faker-js/faker';
const faker = new Faker({ locale: [en] });
const apiconfig = require('../../apiconfig.json');
const { login, createProduct } = require('../../support/api-manage');
const loginuser = require('../../fixtures/loginuser.json');

const payload = {
  name: faker.commerce.productName(),
  cost: faker.number.int({ min: 100, max: 90000 }),
  quantity: faker.number.int({ min: 100, max: 500 }),
  locationId: faker.number.int({ min: 1, max: 5 }),
  DealerId: faker.number.int({ min: 1, max: 5 })
}

describe('Create new products', () => {
  const generatePayload = () => {
    return {
      name: faker.commerce.productName(),
      cost: faker.number.int({ min: 100, max: 90000 }),
      quantity: faker.number.int({ min: 100, max: 500 }),
      locationId: faker.number.int({ min: 1, max: 5 }),
      DealerId: faker.number.int({ min: 1, max: 5 })
    };
  };

  const loginAndCreateProduct = (email, password, payload) => {
    return login(email, password)
      .then((result) => {
        const accessToken = result.access_token;
        return createProduct(payload, accessToken);
      });
  };

  const validateResponse = (response, payload) => {
    expect(response.status).to.eq(201);
    expect(response.body.name).to.eq(payload.name);
    cy.logger('apitest', 'Validate user is able to create new products -- Test Passed');
    cy.logger('apitest', JSON.stringify(response.body, null, 2));
  };

  it('Validate user is able to create new products', () => {
    const payload = generatePayload();
    loginAndCreateProduct(loginUser.email, loginUser.password, payload)
      .then((response) => {
        validateResponse(response, payload);
      })
      .catch((error) => {
        console.error(error);
        cy.logger('apitest', 'Error creating product');
      });
  });
});