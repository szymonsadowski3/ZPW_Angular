var cfg = require('./const');
var loginScreen = require('./LoginScreen');

describe('Wycieczki app', function() {
  it('Should open without crashing', function() {
    browser.driver.get(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);
  });

  it('Should have a title', function() {
    browser.get(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);

    expect(browser.getTitle()).toEqual('Wycieczki');
  });

  it('Should allow user to log-in and redirect him to main page', function() {
    loginScreen.loginProcess().then(() => {
      return browser.driver.wait(function() {
        return browser.driver.getCurrentUrl().then(function(url) {
          return url.includes(cfg.mainPageEndpoint);
        });
      }, 10000);
    });
  });
});
