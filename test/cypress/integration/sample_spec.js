const cfg = {
  baseUrl: 'http://localhost:5000',
  mainPageEndpoint: 'wycieczki',

  userName: 'szymonsadowski@gmail.com',
  userPass: 'bimber12',

  incorrectUserName: 'notExistingUser@gmail.com',
  incorrectUserPass: 'someRandomPassword',

  adminName: 'szymonsadowski3@gmail.com',
  adminPass: 'bimber12',
};

class LoginScreen {
  get() {
    cy.visit(`${cfg.baseUrl}/login`);
  }

  fillLogin() {
    cy.get("#inputEmailForm").type(cfg.userName);
    // cy.get("#inputEmailForm").type(cfg.adminName); // TODO: change back to standard user
    cy.get("#inputPasswordForm").type(cfg.userPass);
  }

  fillIncorrectLogin() {
    cy.get("#inputEmailForm").type(cfg.incorrectUserName);
    cy.get("#inputPasswordForm").type(cfg.incorrectUserPass);
  }

  fillAdminLogin() {
    cy.get("#inputEmailForm").type(cfg.adminName);
    cy.get("#inputPasswordForm").type(cfg.adminPass);
  }

  submitLogin(name) {
    cy.get("#login-button").click();
  }

  loginProcess() {
    this.get();
    this.fillLogin();
    return this.submitLogin();
  }

  adminLoginProcess() {
    this.get();
    this.fillAdminLogin();
    return this.submitLogin();
  }

  incorrectCredentialsLoginProcess() {
    this.get();
    this.fillAdminLogin();
    return this.submitLogin();
  }

  switchToRegister() {
    cy.get('.register-tab').click();
  }

  getRegisterEmailInput() {
    return cy.get('#input2EmailForm');
  }

  getRegisterPasswordInput() {
    return cy.get('#input2PasswordForm');
  }

  getRegisterConfirmPasswordInput() {
    return cy.get('#input2Password2Form');
  }

  getRegisterButton() {
    return cy.get('.register-btn');
  }

  fillWithIncorrectEmail() {
    this.getRegisterEmailInput().type('incorrect email');
    this.getRegisterPasswordInput().type('pass');
    this.getRegisterConfirmPasswordInput().type('pass');
  }

  fillWithShortPassword() {
    this.getRegisterEmailInput().type('test@test.pl');
    this.getRegisterPasswordInput().type('pass');
    this.getRegisterConfirmPasswordInput().type('pass');
  }

  fillWithExisitngAccount() {
    this.getRegisterEmailInput().type(cfg.userName);
    this.getRegisterPasswordInput().type(cfg.userPass);
    this.getRegisterConfirmPasswordInput().type(cfg.userPass);
  }

  tryRegisterWithIncorrectEmail() {
    this.get();
    this.switchToRegister();
    this.fillWithIncorrectEmail();
    this.getRegisterButton().click();
  }

  tryRegisterWithShortPassword() {
    this.get();
    this.switchToRegister();
    this.fillWithShortPassword();
    this.getRegisterButton().click();
  }

  tryRegisterWithExistingAccount() {
    this.get();
    this.switchToRegister();
    this.fillWithExisitngAccount();
    this.getRegisterButton().click();
  }
}
const loginScreen = new LoginScreen();

class TripsScreen {
  getTrips() {
    return cy.get('.single-wycieczka');
  }

  getTripsMainSections() {
    return cy.get('.single-wycieczka .main-section');
  }

  getFirstTrip() {
    return this.getTrips()[0];
  }

  getLoggedUserButton() {
    return cy.get('.logged-user-button');
  }

  getSiteTitleBar() {
    return cy.get('.site-title-bar');
  }

  get() {
    cy.visit(`${cfg.baseUrl}/${cfg.mainPageEndpoint}`);
  }

  route() {
    cy.server();
    cy.route(`/${cfg.mainPageEndpoint}`);
  }

  getAdminPanelButton() {
    return cy.get('.admin-panel-button');
  }

  getFilterDropdown() {
    return cy.get('.cuppa-dropdown');
  }

  getFirstFilterOption() {
    return cy.get('.cuppa-dropdown li').first();
  }

  getToast() {
    return cy.get('.toast-message').first();
  }
}
const tripsScreen = new TripsScreen();

class TripsDetails {
  getAddToCartButton() {
    return cy.get('.add-to-cart-button');
  }

  getImageInGallery() {
    return cy.get('.ngx-gallery-image');
    // ngx-gallery-thumbnail
  }
}
const tripsDetails = new TripsDetails();

class Cart {
  getOpenCartToggle() {
    return cy.get('.open-cart-toggle');
  }

  getGoToCartButton() {
    return cy.get('.go-to-cart-button');
  }

  getRows() {
    return cy.get('tbody tr');
  }

  getCheckoutButton() {
    return cy.get('.checkout-button').last();
  }

  getCheckoutConfirmButton() {
    return cy.get('#cart > tfoot > tr > td:nth-child(4) > mwl-confirmation-popover-window > div > div.popover-content.popover-body > div > div:nth-child(2) > button');
  }

  getQuantityInput() {
    return cy.get('.quantity-input').last();
  }

  getShowMyOrdersButton() {
    return cy.get('.show-my-orders-button');
  }

  getLastRemoveItemFromTheCartButton() {
    return cy.get('.remove-item-from-cart-button').last();
  }
}
const cart = new Cart();

class AfterOrder {
    getMessage() {
      return cy.get('.thank-you-for-order-msg');
    }

    getGoBackButton() {
      return cy.get('.go-back-to-main-page-btn');
    }

    getEndpoint() {
      return '/after-order';
    }
};
const afterOrder = new AfterOrder();

class ListOfOrders {
  getOrderSummaries() {
    return cy.get('.order-summary');
  }

  getLastRowQuantity() {
    return cy.get('tbody tr .quantity').last();
  }
};
const listOfOrders = new ListOfOrders();

class AdminPanel {
  static updateScreenText = 'Edytujesz wycieczkę';

  getHeader() {
    return cy.get('h1');
  }

  getHeader3() {
    return cy.get('h3');
  }

  getAddNewTripButton() {
    return cy.get('.add-new-trip-btn');
  }

  getNewTripFileInput() {
    return cy.get('input[type=file]');
  }

  getLastTripFromTheList() {
    return cy.get('tbody tr a').last();
  }

  getTrips() {
    return cy.get('tbody tr');
  }

  getLastRemoveButton() {
    return cy.get('tbody tr .remove-button').last();
  }

  getLastUpdateButton() {
    return cy.get('tbody tr .update-button').last();
  }

  getDropZone() {
    return cy.get('.ngx-file-drop__drop-zone');
  }

  getConfirmButton() {
    return cy.get('div.popover-content.popover-body > div > div:nth-child(2) > button');
  }

  getTitleInput() {
    return cy.get('form input').first();
  }

  editTripButton() {
    return cy.get('.edit-trip-btn');
  }

  getGoBackButton() {
    return cy.get('.go-back-btn');
  }

  getDurationInput() {
    return cy.get('#czasTrwania');
  }

  getPromotionValueInput() {
    return cy.get('#poziomObnizki');
  }

  getFirstTripCheckbox() {
    return cy.get('.form-check .form-check-input').first();
  }

  getAddPromotionButton() {
    return cy.get('.add-promotion-btn');
  }
};
const adminPanel = new AdminPanel();


// Common functions
function addFirstTripToCart() {
  loginScreen.loginProcess();

  // tripsScreen.get();
  tripsScreen.route();

  tripsScreen.getTripsMainSections().first().click();
  tripsDetails.getAddToCartButton().click();
}

function addSecondTripToCart() {
  tripsScreen.getSiteTitleBar().click();
  tripsScreen.getTripsMainSections().eq(2).click();
  tripsDetails.getAddToCartButton().click();
}

function submitOrder() {
  cart.getGoToCartButton().click();
  cart.getQuantityInput().type(1);
  cart.getCheckoutButton().click();
  cart.getCheckoutConfirmButton().click();
}

function makeOrder() {
  cart.getGoToCartButton().click();
  cart.getCheckoutButton().click();
  cart.getCheckoutConfirmButton().click();
}

function submitOrderAndViewListOfOrders() {
  makeOrder();
  afterOrder.getGoBackButton().click();
  tripsScreen.getLoggedUserButton().click();
  cart.getShowMyOrdersButton().click();
}

function goToAdminPanel() {
  loginScreen.adminLoginProcess();
  cy.wait(1000);
  tripsScreen.getLoggedUserButton().click();
  cy.wait(1000);
  tripsScreen.getAdminPanelButton().click();
}
// /Common functions

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
  //
  // it('Should not allow to log-in with incorrect credentials and indicate it on the screen', function() {
  //   const incorrectCredentialsMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
  //   loginScreen.incorrectCredentialsLoginProcess();
  //   cy.on('window:alert', (str) => {
  //     expect(str).to.equal(incorrectCredentialsMessage)
  //   })
  // });
  //

  // it('Should not allow to register with incorrect e-mail', function() {
  //   const errorMsg = 'The email address is badly formatted.';
  //   loginScreen.tryRegisterWithIncorrectEmail();
  //   cy.on('window:alert', (str) => {
  //     expect(str).to.equal(errorMsg)
  //   })
  // });

  // it('Should not allow to register with password less than 6 characters', function() {
  //   const errorMsg = 'Password should be at least 6 characters';
  //   loginScreen.tryRegisterWithShortPassword();
  //   cy.on('window:alert', (str) => {
  //     expect(str).to.equal(errorMsg)
  //   })
  // });

  it('Should not allow to register with already used account', function() {
    const errorMsg = 'The email address is already in use by another account.';
    loginScreen.tryRegisterWithShortPassword();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(errorMsg)
    })
  });

  // it('Should allow user to log-in and redirect him to main page', function() {
  //   loginScreen.loginProcess();
  //   cy.location('pathname').should('eq', '/wycieczki');
  // });

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
  // it('Should allow user to add a trip to the cart', function() {
  //   addFirstTripToCart();
  //   cart.getOpenCartToggle().click();
  //   cart.getRows().its('length').should('be.gt', 0);
  // });
  //
  // it('Should allow user to remove items from the cart', function() {
  //   addFirstTripToCart();
  //   cy.wait(500);
  //   addSecondTripToCart();
  //   cart.getOpenCartToggle().click();
  //   cart.getRows().its('length').should('eq', 2);
  //   cart.getLastRemoveItemFromTheCartButton().click();
  //   cart.getRows().its('length').should('eq', 1);
  // });
  //
  // it('Should allow user to specify quantity of reserved seats on a trip', function() {
  //   addFirstTripToCart();
  //   cy.wait(500);
  //   addSecondTripToCart();
  //   cart.getOpenCartToggle().click();
  //   cart.getQuantityInput().clear();
  //   cart.getQuantityInput().type(2);
  //   submitOrderAndViewListOfOrders();
  //   listOfOrders.getLastRowQuantity().should('contain', '2');
  // });
  //
  // it('Should allow user to make a reservation after filling the cart', function() {
  //   addFirstTripToCart();
  //   submitOrder();
  //   cy.location('pathname').should('contain', afterOrder.getEndpoint());
  //   afterOrder.getMessage().should('exist');
  // });
  //
  // it('Should allow user to view the list of reservations after making an order', function() {
  //   addFirstTripToCart();
  //   submitOrderAndViewListOfOrders();
  //   listOfOrders.getOrderSummaries().its('length').should('be.gt', 0);
  // });
  //
  // it('Should not show option to go to admin panel for standard user', function() {
  //   loginScreen.loginProcess();
  //   tripsScreen.getLoggedUserButton().click();
  //   tripsScreen.getAdminPanelButton().should('not.exist');
  // });
  //
  // it('Should allow admin to access the admin panel', function() {
  //   goToAdminPanel();
  //   adminPanel.getHeader().should('contain', 'Admin');
  // });
  //
  // it('Should allow admin to define new trip (with custom photos)', function() {
  //   goToAdminPanel();
  //   const fileName = 'vacation1.jpg';
  //
  //   cy.fixture(fileName).then(fileContent => {
  //     adminPanel.getNewTripFileInput().upload({ fileContent, fileName, mimeType: 'image/jpg' });
  //   });
  //
  //   cy.wait(2000);
  //
  //   adminPanel.getAddNewTripButton().click();
  //
  //   adminPanel.getLastTripFromTheList().click();
  //
  //   cy.wait(1000);
  //
  //   tripsDetails.getImageInGallery().should('exist');
  // });
  //
  // it('Should allow admin to define new trip (with custom photos)', function() {
  //   goToAdminPanel();
  //   const fileName = 'vacation1.jpg';
  //
  //   cy.fixture(fileName).then(fileContent => {
  //     adminPanel.getNewTripFileInput().upload({ fileContent, fileName, mimeType: 'image/jpg' });
  //   });
  //
  //   cy.wait(2000);
  //
  //   adminPanel.getAddNewTripButton().click();
  //
  //   adminPanel.getLastTripFromTheList().click();
  //
  //   cy.wait(1000);
  //
  //   tripsDetails.getImageInGallery().should('exist');
  // });
  //
  // it('Should allow admin to delete trips', function() {
  //   goToAdminPanel();
  //   adminPanel.getTrips().its('length').then((howManyTrips) => {
  //     adminPanel.getLastRemoveButton().click();
  //     cy.wait(500);
  //     adminPanel.getConfirmButton().click();
  //     cy.wait(1000);
  //     adminPanel.getTrips().its('length').should('eq', howManyTrips-1);
  //   });
  // });
  //
  // it('Should allow admin to update trips', function() {
  //   const newTitleForTest = 'Nowy tytuł na potrzeby testu';
  //
  //   goToAdminPanel();
  //   adminPanel.getLastUpdateButton().click();
  //   cy.wait(500);
  //   adminPanel.getHeader3().should('contain', AdminPanel.updateScreenText);
  //   adminPanel.getTitleInput().clear();
  //   adminPanel.getTitleInput().type(newTitleForTest);
  //   adminPanel.editTripButton().click();
  //   adminPanel.getGoBackButton().click();
  //   cy.wait(1000);
  //   adminPanel.getLastTripFromTheList().should('contain', newTitleForTest);
  // });
  //
  // it('Should allow admin to declare promotions', function() {
  //   goToAdminPanel();
  //   adminPanel.getFirstTripCheckbox().click();
  //
  //   adminPanel.getDurationInput().clear();
  //   adminPanel.getDurationInput().type(10);
  //
  //   adminPanel.getPromotionValueInput().clear();
  //   adminPanel.getPromotionValueInput().type(10);
  //
  //   adminPanel.getAddPromotionButton().click();
  //   cy.wait(4000);
  //   tripsScreen.getToast().should('contain', '10%');
  // });
  //
  // it('Should allow user to filter trips', function() {
  //   loginScreen.loginProcess();
  //   tripsScreen.get();
  //   tripsScreen.getTrips().its('length').then((howManyTrips) => {
  //     tripsScreen.getFilterDropdown().click();
  //     tripsScreen.getFirstFilterOption().click();
  //     tripsScreen.getTrips().its('length').should('be.lt', howManyTrips);
  //   });
  // });
});
