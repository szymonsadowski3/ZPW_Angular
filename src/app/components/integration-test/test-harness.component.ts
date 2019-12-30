import {Component} from '@angular/core';
import chai from 'chai';
import {AuthService} from "../../services/auth.service";
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import get from 'lodash/get';
import {FirebaseService} from "../../services/firebase.service";
import {Wycieczka} from "../../models/wycieczka.model";

@Component({
  selector: 'test-harness',
  templateUrl: './test-harness.component.html',
})
export class TestHarness {
  testResults = [];
  iterator = 0;
  private testFunctions: any[];

  callNext() {
    if(this.testFunctions.length > 0) {
      this.testFunctions[0]();
      this.testFunctions.shift();
    }
  }

  // setupErrorReporting() {
  //   const testResults = this.testResults;
  //
  //   window.addEventListener('error', function (evt) {
  //     testResults.push({type: 'assert', status: 'FAIL', msg: "Caught[via 'error' event]:  '" + evt.message + "' from " + evt.filename + ":" + evt.lineno});
  //     evt.preventDefault();
  //   });
  // }
  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  getShortRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);;
  }

  assert(predicate, message) {
    try {
      chai.assert(predicate, message);
      this.testResults.push({type: 'assert', status: 'PASS', msg: message});
    } catch(error) {
      console.error(error);
      this.testResults.push({type: 'assert', status: 'FAIL', msg: JSON.stringify(error)});
    }
  }

  assertDeepEqual(obj1, obj2, msg) {
    try {
      chai.expect(obj1).to.eql(obj2);
      this.testResults.push({type: 'assert', status: 'PASS', msg: msg});
    } catch(error) {
      console.error(error);
      this.testResults.push({type: 'assert', status: 'FAIL', msg: JSON.stringify(error)});
    }
  }

  integrationTestAuthServiceLogin(authService: AuthService) {
    const credentials = {email: 'szymonsadowski3@gmail.com', password: 'bimber12'};
    authService.login(credentials).then(() => {
      this.assert(authService.getUser() === credentials.email, 'should allow to log in and store username after successful login');
      this.callNext();
    });
  }

  integrationTestAuthServiceRegister(authService: AuthService) {
    const credentials = {email: `${this.getShortRandomString()}@test.test`, password: 'Test123456'};
    authService.register(credentials).then(() => {
      this.assert(authService.getUser() === credentials.email, 'should allow to register');
      this.callNext();
    });
  }

  integrationTestAuthServiceRegisterAlreadyUsed(authService: AuthService) {
    const component = this;
    const credentials = {email: 'szymonsadowski3@gmail.com', password: 'bimber12'};
    const testResults = this.testResults;

    function checkFn(evt) {
      const expectedMsg = 'The email address is already in use by another account.';
      if(includes(evt.message, expectedMsg)) {
        testResults.push({type: 'assert', status: 'PASS', msg: "Should prevent from registering on already used e-mail"});
        component.callNext();
      }
    }

    window.addEventListener('error', checkFn); // TODO: maybe extract this to assertError function
    authService.register(credentials).then(() => {
      window.removeEventListener('error', checkFn);
    });
  }

  integrationTestAuthServiceRegisterIncorrectEmail(authService: AuthService) {
    const component = this;
    const credentials = {email: 'incorrectEmail', password: 'bimber12'};
    const testResults = this.testResults;

    function checkFn(evt) {
      //alert(JSON.stringify(evt));
      const expectedMsg = 'The email address is badly formatted.';
      if(includes(evt.message, expectedMsg)) {
        testResults.push({type: 'assert', status: 'PASS', msg: "Should prevent from registering with incorrect email"});
        component.callNext();
      }
    }

    window.addEventListener('error', checkFn);
    authService.register(credentials).then(() => {
      window.removeEventListener('error', checkFn);
    });
  }

  integrationTestAuthServiceRegisterShortPassword(authService: AuthService) {
    const component = this;
    const credentials = {email: 'szymonsadowski3@gmail.com', password: 'pas'};
    const testResults = this.testResults;

    function checkFn(evt) {
      const expectedMsg = 'Password should be at least 6 characters';
      if(includes(evt.message, expectedMsg)) {
        testResults.push({type: 'assert', status: 'PASS', msg: "Should prevent from registering with short password"});
        component.callNext();
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
      this.callNext();
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
      const lengthBeforeDeleting = products.length;
      firebaseService.deleteTrip(products[0]);
      firebaseService.getAllTrips().subscribe((products: any) => {
        const lengthAfterDeleting = products.length;
        this.assert(lengthBeforeDeleting - 1 == lengthAfterDeleting, `Should allow to permanently delete some trip`);
        this.callNext();
      });
    }, TIMEOUT_VALUE);
  }

  integrationTestBackendServiceAddTrip(firebaseService: FirebaseService) {
    const TIMEOUT_VALUE = 5000;
    const wycieczkaToAdd = {
      nazwa: "INTEGRATION TEST TRIP",
      docelowyKrajWycieczki: "Anglia",
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

    firebaseService.addTrip(wycieczkaToAdd);

    setTimeout(() => {
      firebaseService.getAllTrips().subscribe((products: any) => {
        const lastTripInTheList = products[products.length - 1];
        console.dir(lastTripInTheList);

        forEach(keysToCheck, key => {
          this.assert(lastTripInTheList[key] == wycieczkaToAdd[key], `Model trip to add and trip retrieved from backend after adding should have the same value of key ${key} (object comparison)`)
        });

        this.callNext();
      });
    }, TIMEOUT_VALUE);
  }

  integrationTestBackendServiceAddOrder(firebaseService: FirebaseService) {
    const TIMEOUT_VALUE = 5000;
    const orderToAdd = {
      "creationDate" : "2019-12-16T16:42:48.611Z",
      "products" : [ {
        "count" : 6,
        "trip" : {
          "cenaJednostkowa" : 1100,
          "dataRozpoczecia" : "2019-12-12",
          "dataZakonczenia" : "2019-12-19",
          "docelowyKrajWycieczki" : "Egipt",
          "id" : "-LvKdYohBbapD0STG32-",
          "ileZarezerwowano" : 6,
          "linkDoZdj" : "https://picsum.photos/100/100",
          "maxIloscMiejsc" : 7,
          "nazwa" : "Tygodniowa wycieczka do Egiptu",
          "oceny" : [ {
            "ratedBy" : "szymonsadowski3@gmail.com",
            "rating" : 5
          }, ],
          "opis" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque."
        }
      } ],
      "whoOrdered" : "test@test.test"
    };

    const keysToCheck = ["whoOrdered"];

    firebaseService.addOrder(orderToAdd);

    setTimeout(() => {
      firebaseService.getAllOrders().subscribe((orders: any) => {
        const lastOrderInTheList = orders[orders.length - 1];
        orderToAdd['id'] = lastOrderInTheList.id;

        this.assertDeepEqual(orderToAdd, lastOrderInTheList, "Model order to add and order retrieved from backend after adding should be deeply equal");
        this.callNext();
      });
    }, TIMEOUT_VALUE);
  }

  integrationTestBackendServiceAddRating(firebaseService: FirebaseService) {
    // TODO: impl
  }

  integrationTestBackendServiceUpdateTrip(firebaseService: FirebaseService) {
    const TIMEOUT_VALUE = 5000;
    // const wycieczkaToAdd = {
    //   nazwa: "INTEGRATION TEST TRIP",
    //   docelowyKrajWycieczki: "Anglia",
    //   dataRozpoczecia: "2019-12-12",
    //   dataZakonczenia: "2019-12-26",
    //   cenaJednostkowa: 1000,
    //   maxIloscMiejsc: 10,
    //   opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel velit nulla. Nam malesuada efficitur maximus. Vestibulum eu maximus dolor. Cras commodo tortor aliquam lobortis pellentesque.",
    //   linkDoZdj: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    //   ileZarezerwowano: 0,
    //   oceny: [],
    // };

    let lastTripInTheList = {};

    setTimeout(() => {
      firebaseService.getAllTrips().subscribe((products: any) => {
        lastTripInTheList = products[products.length - 1];
      });

      lastTripInTheList["nazwa"] = "Edited Trip";

      firebaseService.updateTrip(lastTripInTheList);

      firebaseService.getAllTrips().subscribe((products: any) => {
        let newLastTripInTheList = products[products.length - 1];
        this.assert(newLastTripInTheList["nazwa"] == "Edited Trip", 'Edited trip should have updated values')
        this.callNext();
      });
    }, TIMEOUT_VALUE);
  }

  integrationTestBackendServiceGetRoleCheckAdmin(firebaseService: FirebaseService) {
    firebaseService.getRole("szymonsadowski3@gmail.com").subscribe(roles => {
      const isAdmin = (get(roles, '[0].role') === 'admin');
      this.assert(isAdmin, 'Check if backend service correctly returns admin role');
      this.callNext();
    });
  }

  integrationTestBackendServiceGetRoleCheckStandardUser(firebaseService: FirebaseService) {
    firebaseService.getRole("test@test.test").subscribe(roles => {
      console.dir(roles);
      const isAdmin = (get(roles, '[0].role') === 'user');
      this.assert(isAdmin, 'Check if backend service correctly returns standard user role');
      this.callNext();
    });
  }

  // TODO: dump json from backend to have snapshot document for plan of tests

  constructor(private authService: AuthService, private firebaseService: FirebaseService) {
    const testsToRun = {
      '[Authorization Service Integration Test] LOGIN': () => {this.integrationTestAuthServiceLogin(authService);},
      '[Authorization Service Integration Test] REGISTER': () => {this.integrationTestAuthServiceRegister(authService);},
      '[Authorization Service Integration Test] REGISTER WITH ALREADY IN-USE EMAIL': () => {this.integrationTestAuthServiceRegisterAlreadyUsed(authService);},
      '[Authorization Service Integration Test] REGISTER WITH INCORRECT EMAIL': () => {this.integrationTestAuthServiceRegisterIncorrectEmail(authService);},
      '[Authorization Service Integration Test] REGISTER WITH SHORT PASSWORD': () => {this.integrationTestAuthServiceRegisterShortPassword(authService);},
      '[Backend Service Integration Test] GET ALL TRIPS': () => {this.integrationTestBackendServiceGetAllTrips(firebaseService);},
      '[Backend Service Integration Test] DELETE TRIP': () => {this.integrationTestBackendServiceDeleteTrips(firebaseService);},
      '[Backend Service Integration Test] ADD TRIP': () => {this.integrationTestBackendServiceAddTrip(firebaseService);},
      '[Backend Service Integration Test] ADD ORDER': () => {this.integrationTestBackendServiceAddOrder(firebaseService);},
      // '[Backend Service Integration Test] ADD RATING': () => {this.integrationTestBackendServiceAddRating(firebaseService);},
      '[Backend Service Integration Test] UPDATE TRIP': () => {this.integrationTestBackendServiceUpdateTrip(firebaseService);},
      '[Backend Service Integration Test] GET ROLE CHECK ADMIN': () => {this.integrationTestBackendServiceGetRoleCheckAdmin(firebaseService);},
      '[Backend Service Integration Test] GET ROLE CHECK STANDARD USER': () => {this.integrationTestBackendServiceGetRoleCheckStandardUser(firebaseService);},
    };

    // const serial = funcs =>
    //   funcs.reduce((promise, func) =>
    //     promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]));
    //
    //
    // const testFunctions = [];
    // const testNames = [];
    //
    // const testRes = this.testResults;
    //
    // forEach(testsToRun, (testFunc, testName) => {
    //   testFunctions.push(() => {
    //     return new Promise(function(resolve, reject) {
    //       testRes.push({type: 'test', name: testName});
    //       testFunc();
    //       resolve('OK');
    //     });
    //   });
    //   testNames.push(testName);
    // });
    //
    // serial(testFunctions);
    //

    const testFunctions = [];

    forEach(testsToRun, (testFunc, testName) => {
      const tf = () => {
        this.testResults.push({type: 'test', name: testName});
        testFunc();
      };
      testFunctions.push(tf);
    });

    console.dir(testFunctions);

    this.testFunctions = testFunctions;

    this.callNext();

    // setInterval(() => {
    //   console.log(`Running test ${testNames[this.iterator]}`);
    //   try {
    //     testFunctions[this.iterator]();
    //   } catch(error) {
    //     this.testResults.push({type: 'assert', status: 'FAIL', msg: JSON.stringify(error)});
    //   }
    // }, 1000);

    //
    // let iterator = -1;
    // setInterval(() => {
    //   this.testResults.push({type: 'test', name: testNames[iterator]});
    //   console.log(`Running test ${testNames[iterator]}`);
    //   iterator += 1;
    //   try {
    //     testFunctions[iterator]();
    //   } catch(error) {
    //     this.testResults.push({type: 'assert', status: 'FAIL', msg: JSON.stringify(error)});
    //   }
    // }, 10000);

    // forEach(testsToRun, (testFunc, testName) => {
    //   this.testResults.push({type: 'test', name: testName});
    //   console.log(`Running test ${testName}`);
    //   try {
    //     testFunc();
    //     // this.sleep(2000);
    //   } catch(error) {
    //     this.testResults.push({type: 'assert', status: 'FAIL', msg: JSON.stringify(error)});
    //   }
    // });

    // testsToRun.forEach(test => {
    //   console.log('running test...');
    //   test();
    // });
  }
}
