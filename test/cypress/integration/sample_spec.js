const baseUrl = 'http://localhost:5000';
const mainPageEndpoint = 'wycieczki';
const userName = 'szymonsadowski3@gmail.com';
const userPass = 'bimber12';

const cfg = {
  baseUrl,
  mainPageEndpoint,
  userName,
  userPass,
};

class LoginScreen {
  get() {
    cy.visit(`${cfg.baseUrl}/login`);
  };

  fillLogin(name) {
    cy.get("#inputEmailForm").type(cfg.userName);
    cy.get("#inputPasswordForm").type(cfg.userPass);

  };

  submitLogin(name) {
    cy.get("#login-button").click();
  };

  loginProcess() {
    this.get();
    this.fillLogin();
    return this.submitLogin();
  };
};

const loginScreen = new LoginScreen();

describe('Wycieczki app', function() {
  it('Should open without crashing', function () {
    cy.visit(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);
  });

  it('Should have a title', function() {
    cy.visit(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);

    cy.title().should('eq', 'Wycieczki');
  });

  it('Should allow user to log-in and redirect him to main page', function() {
    loginScreen.loginProcess();
    cy.location('pathname').should('eq', '/wycieczki');
  });
});
