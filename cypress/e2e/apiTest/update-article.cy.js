import '../../support/commands';
import { Faker, en } from '@faker-js/faker';
const faker = new Faker({ locale: [en] });
const apiconfig = require('../../apiconfig.json');
const { login, updateProduct, updateProductwithoutToken } = require('../../support/api-manage');
const loginuser = require('../../fixtures/loginuser.json');
const productId = 1;

describe('Update Products', () => {
    const scenarios = [
        {
            description: 'Validate user is able to update existing products',
            payload: {
                cost: faker.number.int({ min: 100, max: 90000 }),
                quantity: faker.number.int({ min: 100, max: 500 }),
                locationId: faker.number.int({ min: 1, max: 5 }),
                DealerId: faker.number.int({ min: 1, max: 5 }),
            },
            expectStatus: 200,
            expectQuantity: true,
        },
        {
            description: 'Validate user is able to update existing products with minimum values',
            payload: {
                cost: 100,
                quantity: 100,
                locationId: 1,
                DealerId: 1,
            },
            expectStatus: 200,
            expectQuantity: true,
        },
        {
            description: 'Validate user is able to update existing products with maximum values',
            payload: {
                cost: 90000,
                quantity: 500,
                locationId: 5,
                DealerId: 5,
            },
            expectStatus: 200,
            expectQuantity: true,
        },
        {
            description: 'Validate user cannot update existing products without token',
            payload: {
                cost: faker.number.int({ min: 100, max: 90000 }),
                quantity: faker.number.int({ min: 100, max: 500 }),
                locationId: faker.number.int({ min: 1, max: 5 }),
                DealerId: faker.number.int({ min: 1, max: 5 }),
            },
            expectStatus: 401, // Assuming 401 Unauthorized for no token
            expectQuantity: false,
            useToken: false,
        },
    ];

    scenarios.forEach(({ description, payload, expectStatus, expectQuantity, useToken = true }) => {
        it(description, () => {
            const { email, password } = loginuser;
            const loginPromise = useToken ? login(email, password) : Promise.resolve({ access_token: null });

            loginPromise.then((result) => {
                const accessToken = useToken ? result.access_token : null;
                const updatePromise = useToken ? updateProduct(payload, accessToken, productId) : updateProductwithoutToken(payload, productId);

                updatePromise.then((response) => {
                    expect(response.status).to.eq(expectStatus);
                    if (expectQuantity) {
                        expect(response.body.quantity).to.eq(payload.quantity);
                    }
                    const responseBodyString = JSON.stringify(response.body, null, 2);
                    cy.logger('apitest', `${description} -- Test Passed`);
                    cy.logger('apitest', `Response Body:\n${responseBodyString}`);
                });
            });
        });
    });
});