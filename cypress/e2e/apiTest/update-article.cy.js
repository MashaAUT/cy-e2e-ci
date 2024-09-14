import '../../support/commands';
import { Faker, en } from '@faker-js/faker';
const faker = new Faker({ locale: [en] });
const apiconfig = require('../../apiconfig.json');
const { login, updateProduct, updateProductwithoutToken } = require('../../support/api-manage');
const loginuser = require('../../fixtures/loginuser.json');
const productId = 1;
const payload = {
    cost: faker.number.int({ min: 100, max: 90000 }),
    quantity: faker.number.int({ min: 100, max: 500 }),
    locationId: faker.number.int({ min: 1, max: 5 }),
    DealerId: faker.number.int({ min: 1, max: 5 }),
};

describe('Update Products', () => {
    it('Validate user is able to update existing products', () => {
        const { email, password } = loginuser;
        login(email, password)
            .then((result) => {
                const accessToken = result.access_token; // Access the access_token
                updateProduct(payload, accessToken, productId).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.quantity).to.eq(payload.quantity);

                    const responseBodyString = JSON.stringify(response.body, null, 2);
                    cy.logger('apitest', 'Validate user is able to update existing products -- Test Passed');
                    cy.logger('apitest', `Response Body:\n${responseBodyString}`);
                });
            });
    });
});
