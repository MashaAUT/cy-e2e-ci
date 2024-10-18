import '../../support/commands';
import { Faker, en } from '@faker-js/faker';
const faker = new Faker({ locale: [en] });
const apiconfig = require('../../apiconfig.json');
const { login, patchProduct, patchProductWithoutToken } = require('../../support/api-manage');
const loginuser = require('../../fixtures/loginuser.json');
const productId = 1;

describe('Patch Products', () => {
    const scenarios = [
        {
            description: 'Validate user is able to partially update existing products',
            payload: {
                cost: faker.number.int({ min: 100, max: 90000 }), // Update only cost
            },
            expectStatus: 200,
            expectQuantity: false,
        },
        {
            description: 'Validate user is able to partially update existing products with minimum values',
            payload: {
                quantity: 100, // Update only quantity
            },
            expectStatus: 200,
            expectQuantity: true,
        },
        {
            description: 'Validate user is able to partially update existing products with maximum values',
            payload: {
                locationId: 5, // Update only locationId
            },
            expectStatus: 200,
            expectQuantity: false,
        },
        {
            description: 'Validate user cannot partially update existing products without token',
            payload: {
                DealerId: 1, // Attempt to update DealerId without token
            },
            expectStatus: 401, // Assuming 401 Unauthorized for no token
            expectQuantity: false,
            useToken: false,
        },
        {
            description: 'Validate user can partially update multiple fields',
            payload: {
                cost: faker.number.int({ min: 100, max: 90000 }),
                quantity: faker.number.int({ min: 100, max: 500 }),
            },
            expectStatus: 200,
            expectQuantity: true,
        },
        {
            description: 'Validate user cannot update with invalid field',
            payload: {
                invalidField: 'Invalid Value', // Attempting to update with an invalid field
            },
            expectStatus: 400, // Assuming 400 Bad Request for invalid fields
            expectQuantity: false,
        },
    ];

    scenarios.forEach(({ description, payload, expectStatus, expectQuantity, useToken = true }) => {
        it(description, () => {
            const { email, password } = loginuser;
            const loginPromise = useToken ? login(email, password) : Promise.resolve({ access_token: null });

            loginPromise.then((result) => {
                const accessToken = useToken ? result.access_token : null;
                const patchPromise = useToken ? patchProduct(payload, accessToken, productId) : patchProductWithoutToken(payload, productId);

                patchPromise.then((response) => {
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