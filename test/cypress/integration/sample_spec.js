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

class TripsScreen {
  getTrips() {
    return cy.get('.single-wycieczka');
  };

  getTripsMainSections() {
    return cy.get('.single-wycieczka .main-section');
  };

  getFirstTrip() {
    return this.getTrips()[0];
  };

  get() {
    cy.visit(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);
  };

  route() {
    cy.server();
    cy.route(`/${mainPageEndpoint}`);
  }
};
const tripsScreen = new TripsScreen();

class TripsDetails {
  getAddToCartButton() {
    return cy.get('.add-to-cart-button');
  };
};
const tripsDetails = new TripsDetails();

class Cart {
  getOpenCartToggle() {
    return cy.get('.open-cart-toggle');
  };

  getGoToCartButton() {
    return cy.get('.go-to-cart-button');
  }

  getRows() {
    return cy.get('tbody tr');
  };

  getCheckoutButton() {
    return cy.get('.checkout-button').last();
  }

  getCheckoutConfirmButton() {
    return cy.get('#cart > tfoot > tr > td:nth-child(4) > mwl-confirmation-popover-window > div > div.popover-content.popover-body > div > div:nth-child(2) > button');
  }

  getQuantityInput() {
    return cy.get('.quantity-input').last();
  }
};
const cart = new Cart();

class AfterOrder {
    getMessage() {
      return cy.get('.thank-you-for-order-msg');
    }

    getEndpoint() {
      return '/after-order';
    }
};
const afterOrder = new AfterOrder();
// Common functions

function addFirstTripToCart() {
  loginScreen.loginProcess();
  tripsScreen.get();
  tripsScreen.getTripsMainSections().first().click();
  tripsDetails.getAddToCartButton().click();
}


describe('Wycieczki app', function() {
  // it('Should open without crashing', function () {
  //   cy.visit(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);
  // });
  //
  // it('Should have a title', function() {
  //   cy.visit(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);
  //
  //   cy.title().should('eq', 'Wycieczki');
  // });
  //
  // it('Should allow user to log-in and redirect him to main page', function() {
  //   loginScreen.loginProcess();
  //   cy.location('pathname').should('eq', '/wycieczki');
  // });
  //
  // it('Should display available trips to the logged-in user', function() {
  //   loginScreen.loginProcess();
  //   tripsScreen.get();
  //   tripsScreen.getTrips().its('length').should('be.gt', 0);
  // });
  //
  // it('Should allow user to view trip details', function() {
  //   loginScreen.loginProcess();
  //   tripsScreen.route();
  //   tripsScreen.getTripsMainSections().first().click();
  //   cy.location('pathname').should('contain', '/wycieczka');
  // });
  //
  it('Should allow user to add a trip to the cart', function() {
    addFirstTripToCart();
    cart.getOpenCartToggle().click();
    cart.getRows().its('length').should('be.gt', 0);
  });

  it('Should allow user to make a reservation after filling the cart', function() {
    addFirstTripToCart();
    cart.getGoToCartButton().click();
    cart.getQuantityInput().type(1);
    cart.getCheckoutButton().click();
    cart.getCheckoutConfirmButton().click();
    cy.location('pathname').should('contain', afterOrder.getEndpoint());
    afterOrder.getMessage().should('exist');
    // thank-you-for-order-msg
  });

});
