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

// New HTTP request methods

function headRequest(accessToken) {
  if (!accessToken) {
    throw new Error('Access token is required');
  }

  return cy.request({
    method: 'HEAD',
    url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HEAD request failed with status code ${response.status}`);
    }

    return response.headers; // Return only the response headers
  });
}

function putProduct(accessToken, productId, productData) {
  if (!accessToken || !productId || !productData) {
    throw new Error('Access token, product ID, and product data are required');
  }

  return cy.request({
    method: 'PUT',
    url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}/${productId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: productData,
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`PUT request failed with status code ${response.status}`);
    }

    return response.body;
  });
}

function deleteProduct(accessToken, productId) {
  if (!accessToken || !productId) {
    throw new Error('Access token and product ID are required');
  }

  return cy.request({
    method: 'DELETE',
    url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}/${productId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`DELETE request failed with status code ${response.status}`);
    }

    return response.body;
  });
}

function traceRequest(accessToken) {
  if (!accessToken) {
    throw new Error('Access token is required');
  }

  return cy.request({
    method: 'TRACE',
    url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`TRACE request failed with status code ${response.status}`);
    }

    return response.body;
  });
}

function optionsRequest(accessToken) {
  if (!accessToken) {
    throw new Error('Access token is required');
  }

  return cy.request({
    method: 'OPTIONS',
    url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`OPTIONS request failed with status code ${response.status}`);
    }

    return response.body;
  });
}
function connectRequest(accessToken) {
  if (!accessToken) {
    throw new Error('Access token is required');
  }

  return cy.request({
    method: 'CONNECT',
    url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`CONNECT request failed with status code ${response.status}`);
    }

    return response.body; // Return response body
  });
}

function patchProduct(accessToken, productId, productData) {
  if (!accessToken || !productId || !productData) {
    throw new Error('Access token, product ID, and product data are required');
  }

  return cy.request({
    method: 'PATCH',
    url: `${apiconfig.baseUrl}${apiconfig.endpoints.products}/${productId}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: productData,
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`PATCH request failed with status code ${response.status}`);
    }

    return response.body; // Return updated product data
  });
}

module.exports = {
  login,
  getproducts,
  headRequest,
  putProduct,
  deleteProduct,
  traceRequest,
  optionsRequest,
  connectRequest,
  patchProduct
};