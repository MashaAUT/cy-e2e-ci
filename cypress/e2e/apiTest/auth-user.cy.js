import '../../support/commands';
const apiconfig = require('../../apiconfig.json');
const { login } = require('../../support/api-manage');
const loginuser = require('../../fixtures/loginuser.json');


describe('Get valid token', () => {
  it('login with correct email & password', () => {
    const { email, password } = loginuser;
    login(email, password)
      .then((result) => {
        const { response } = result;
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('access_token').that.is.not.empty;
        const accessToken = response.body.access_token;
        cy.logger('apitest', `Validated login with correct email & password`);
        cy.logger('apitest', `Access token: ${accessToken}`);
      });
  });
});

