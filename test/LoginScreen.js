var cfg = require('./const');

const LoginScreen = function() {
  const emailInput = element(by.id('inputEmailForm')).sendKeys('szymonsadowski3@gmail.com');
  const passwordInput = element(by.id('inputPasswordForm')).sendKeys('bimber12');;

  this.get = function() {
    browser.get(`${cfg.baseUrl}/login`);
  };

  this.fillLogin = function(name) {
    element(by.id('inputEmailForm')).sendKeys('szymonsadowski3@gmail.com');
    element(by.id('inputPasswordForm')).sendKeys('bimber12');
  };

  this.submitLogin = function(name) {
    return element(by.id('login-button')).click();
  };
};

module.exports = new LoginScreen();
