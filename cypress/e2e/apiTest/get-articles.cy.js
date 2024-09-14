import '../../support/commands';
const apiconfig = require('../../apiconfig.json');
const { JSONPath } = require('jsonpath-plus');
const { login, getproducts, getproductswithouttoken } = require('../../support/api-manage');
const loginuser = require('../../fixtures/loginuser.json');

describe('Get all products', () => {
  it('GET Request with Bearer Token', () => {
    const { email, password } = loginuser;
    login(email, password)
      .then((result) => {
        const accessToken = result.access_token;
        getproducts(accessToken).then((response) => {
          expect(response.status).to.eq(200); // validate status code as 200 OK
          const productNames = JSONPath({ path: '$..name', json: response.body });

          // Assertion for products
          const expectedProductNames = ['Samsung Galaxy A23 Blue', 'Redmi 11 Prime 5G', 'Samsung Galaxy Flip 5G'];
          expect(productNames).to.include.members(expectedProductNames);

          // Logging the response in log file
          const responseBodyString = JSON.stringify(response.body, null, 2);
          cy.logger('apitest', `Validated products for getproduct call:\n`);
          cy.logger('apitest', `Response Body:\n${responseBodyString}`);
        });
      });
  });
});

it('test request body', () => {
  const { email, password } = loginuser;
  login(email, password)
    .then((result) => {
      const accessToken = result.access_token;
      getproducts(accessToken).then((response) => {
        expect(response.status).to.eq(200); // validate status code as 200 OK

        const responseBody = response.body;
        const A23Price = JSONPath({ path: '$.[0].cost', json: responseBody });
        const M33Name = JSONPath({ path: '$.[2].name', json: responseBody });

        // Assertions for products
        expect(M33Name[0]).to.equal('Samsung Galaxy M33 5G');
        expect(A23Price).to.deep.eq([18999]);

        // Logging the response in log file
        const responseBodyString = JSON.stringify(responseBody, null, 2);
        cy.log(`Response Body:\n${responseBodyString}`);
      });
    });
});


