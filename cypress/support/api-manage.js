import './commands';
const apiconfig = require('../apiconfig.json');

function login(email, password) {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    return cy.request({
        method: 'POST',
        url: `${apiconfig.baseUrl}${apiconfig.endpoints.login}`,
        body: { email, password },
    }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            throw new Error(`Login failed with status code ${response.status}`);
        }

        const { body: { access_token } } = response;
        return { access_token };
    });
}


function getproducts(accessToken) {
    if (!accessToken) {
      throw new Error('Access token is required');
    }
  
    return cy.request({
      method: 'GET',
      url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Failed to retrieve products with status code ${response.status}`);
      }
  
      return response.body; // Return only the response body
    });
  }



module.exports = {
    login,
    getproducts

};