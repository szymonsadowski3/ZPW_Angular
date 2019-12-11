var cfg = require('./const');
var loginScreen = require('./LoginScreen');

describe('Wycieczki app', function() {
  it('Should have a title', function() {
    browser.get(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);

    expect(browser.getTitle()).toEqual('Wycieczki');
  });

  it('Should allow user to log-in and redirct him to main page', function() {
    loginScreen.get();

    loginScreen.fillLogin();

    loginScreen.submitLogin().then(() => {
      return browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
          return url.includes(cfg.mainPageEndpoint);
        });
      }, 10000);
    });

  });
});
