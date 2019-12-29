import {Component} from '@angular/core';
import chai from 'chai';
import {AuthService} from "../../services/auth.service";
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import {FirebaseService} from "../../services/firebase.service";
import {Wycieczka} from "../../models/wycieczka.model";

@Component({
  selector: 'test-harness',
  templateUrl: './test-harness.component.html',
})
export class TestHarness {
  testResults = [];

  // setupErrorReporting() {
  //   const testResults = this.testResults;
  //
  //   window.addEventListener('error', function (evt) {
  //     testResults.push({type: 'assert', status: 'FAIL', msg: "Caught[via 'error' event]:  '" + evt.message + "' from " + evt.filename + ":" + evt.lineno});
  //     evt.preventDefault();
  //   });
  // }

  assert(predicate, message) {
    try {
      chai.assert(predicate, message);
      this.testResults.push({type: 'assert', status: 'PASS', msg: message});
    } catch(error) {
      console.error(error);
      this.testResults.push({type: 'assert', status: 'FAIL', msg: JSON.stringify(error)});
    }
  }

  integrationTestAuthServiceLogin(authService: AuthService) {
    const credentials = {email: 'szymonsadowski3@gmail.com', password: 'bimber12'};
    authService.login(credentials).then(() => {
      this.assert(authService.getUser() === credentials.email, 'should allow to log in and store username after successful login');
    });
  }

  integrationTestAuthServiceRegister(authService: AuthService) {
    const credentials = {email: 'test@test.testbr', password: 'Test123456'};
    authService.register(credentials).then(() => {
      this.assert(authService.getUser() === credentials.email, 'should allow to register');
    });
  }

  integrationTestAuthServiceRegisterAlreadyUsed(authService: AuthService) {
    const credentials = {email: 'szymonsadowski3@gmail.com', password: 'bimber12'};
    const testResults = this.testResults;

    function checkFn(evt) {
      const expectedMsg = 'The email address is already in use by another account.';
      if(includes(evt.message, expectedMsg)) {
        testResults.push({type: 'assert', status: 'PASS', msg: "Should prevent from registering on already used e-mail"});
      }
    }

    window.addEventListener('error', checkFn); // TODO: maybe extract this to assertError function
    authService.register(credentials).then(() => {
      window.removeEventListener('error', checkFn);
    });
  }

  integrationTestAuthServiceRegisterIncorrectEmail(authService: AuthService) {
    const credentials = {email: 'incorrectEmail', password: 'bimber12'};
    const testResults = this.testResults;

    function checkFn(evt) {
      //alert(JSON.stringify(evt));
      const expectedMsg = 'The email address is badly formatted.';
      if(includes(evt.message, expectedMsg)) {
        testResults.push({type: 'assert', status: 'PASS', msg: "Should prevent from registering with incorrect email"});
      }
    }

    window.addEventListener('error', checkFn);
    authService.register(credentials).then(() => {
      window.removeEventListener('error', checkFn);
    });
  }

  integrationTestAuthServiceRegisterShortPassword(authService: AuthService) {
    const credentials = {email: 'szymonsadowski3@gmail.com', password: 'pas'};
    const testResults = this.testResults;

    function checkFn(evt) {
      const expectedMsg = 'Password should be at least 6 characters';
      if(includes(evt.message, expectedMsg)) {
        testResults.push({type: 'assert', status: 'PASS', msg: "Should prevent from registering with short password"});
      }
    }

    window.addEventListener('error', checkFn);
    authService.register(credentials).then(() => {
      window.removeEventListener('error', checkFn);
    });
  }

  integrationTestBackendServiceGetAllTrips(firebaseService: FirebaseService) {
    const expectedKeys = [
      "cenaJednostkowa", "dataRozpoczecia", "dataZakonczenia", "docelowyKrajWycieczki", "id",
      "ileZarezerwowano", "linkDoZdj", "maxIloscMiejsc", "nazwa", "opis"
    ];

    firebaseService.getAllTrips().subscribe((products: any) => {
      this.assert( Array.isArray(products), "Should return all trips in type of array");

      forEach(expectedKeys, key => {
        this.assert(key in products[0], `${key} is present in response type`);
      });
      console.dir(products);
    });
  }

  integrationTestBackendServiceDeleteTrips(firebaseService: FirebaseService) {
    const TIMEOUT_VALUE = 5000;
    let products = [];

    firebaseService.getAllTrips().subscribe((resproducts: any) => {
      console.dir(resproducts);
      products = resproducts;
    });

    setTimeout(() => {
      console.dir(products);

      const lengthBeforeDeleting = products.length;
      firebaseService.deleteTrip(products[0]);
      firebaseService.getAllTrips().subscribe((products: any) => {
        const lengthAfterDeleting = products.length;
        this.assert(lengthBeforeDeleting - 1 == lengthAfterDeleting, `Should allow to permanently delete some trip`);
      });
    }, TIMEOUT_VALUE);
  }

  integrationTestBackendServiceAddTrip(firebaseService: FirebaseService) {
    const wycieczkaToAdd = {
      nazwa: "INTEGRATION TEST TRIP",
      docelowyKrajWycieczki: "Belgia",
      dataRozpoczecia: "2019-12-12",
      dataZakonczenia: "2019-12-26",
      cenaJednostkowa: 1000,
      maxIloscMiejsc: 10,
      opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
      linkDoZdj: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      ileZarezerwowano: 0,
      oceny: [],
    };

    const keysToCheck = [
      "cenaJednostkowa", "dataRozpoczecia", "dataZakonczenia", "docelowyKrajWycieczki",
      "ileZarezerwowano", "linkDoZdj", "maxIloscMiejsc", "nazwa", "opis"
    ];

    firebaseService.getAllTrips().subscribe((products: any) => {
      const lastTripInTheList = products[products.length - 1];
      console.dir(lastTripInTheList);

      forEach(keysToCheck, key => {
        this.assert(lastTripInTheList[key] == wycieczkaToAdd[key], `Model trip to add and recently added trip should have the same value of key ${key} (object comparison)`)
      });
    });
  }

  constructor(private authService: AuthService, private firebaseService: FirebaseService) {
    const testsToRun = {
      // '[Authorization Service Integration Test] LOGIN': () => {this.integrationTestAuthServiceLogin(authService);},
      // '[Authorization Service Integration Test] REGISTER': () => {this.integrationTestAuthServiceRegister(authService);},
      // '[Authorization Service Integration Test] REGISTER WITH ALREADY IN-USE EMAIL': () => {this.integrationTestAuthServiceRegisterAlreadyUsed(authService);},
      // '[Authorization Service Integration Test] REGISTER WITH INCORRECT EMAIL': () => {this.integrationTestAuthServiceRegisterIncorrectEmail(authService);},
      // '[Authorization Service Integration Test] REGISTER WITH SHORT PASSWORD': () => {this.integrationTestAuthServiceRegisterShortPassword(authService);},
      // '[Backend Service Integration Test] GET ALL TRIPS': () => {this.integrationTestBackendServiceGetAllTrips(firebaseService);},
      // '[Backend Service Integration Test] DELETE TRIP': () => {this.integrationTestBackendServiceDeleteTrips(firebaseService);},
      '[Backend Service Integration Test] ADD TRIP': () => {this.integrationTestBackendServiceAddTrip(firebaseService);},
    };

    forEach(testsToRun, (testFunc, testName) => {
      this.testResults.push({type: 'test', name: testName});
      console.log(`Running test ${testName}`);
      try {
        testFunc();
      } catch(error) {
        this.testResults.push({type: 'assert', status: 'FAIL', msg: JSON.stringify(error)});
      }
    });

    // testsToRun.forEach(test => {
    //   console.log('running test...');
    //   test();
    // });
  }
}
