import {Component} from '@angular/core';
import chai from 'chai';
import {AuthService} from "../../services/auth.service";
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';

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
    // try {
      chai.assert(predicate, message);
      this.testResults.push({type: 'assert', status: 'PASS', msg: message});
    // } catch(error) {
    //   console.error(error);
    //   this.testResults.push({type: 'assert', status: 'FAIL', msg: JSON.stringify(error)});
    // }
  }

  integrationTestAuthServiceLogin(authService: AuthService) {
    const credentials = {email: 'szymonsadowski3@gmail.com', password: 'bimber12'};
    authService.login(credentials).then(() => {
      this.assert(authService.getUser() === credentials.email, 'should allow user to log in and store username after successful login');
    });
  }

  integrationTestAuthServiceRegister(authService: AuthService) {
    const credentials = {email: 'test@test.testbr', password: 'Test123456'};
    authService.register(credentials).then(() => {
      this.assert(authService.getUser() === credentials.email, 'should allow user to register');
    });
  }

  integrationTestAuthServiceRegisterAlreadyUsed(authService: AuthService) {
    const credentials = {email: 'szymonsadowski3@gmail.com', password: 'bimber12'};
    const testResults = this.testResults;

    function checkFn(evt) {
      const expectedMsg = 'The email address is already in use by another account.';
      if(includes(evt.message, expectedMsg)) {
        testResults.push({type: 'assert', status: 'PASS', msg: "Should prevent user from registering on already used e-mail"});
      }
    }

    window.addEventListener('error', checkFn);
    authService.register(credentials).then(() => {
      window.removeEventListener('error', checkFn);
    });
  }

  constructor(private authService: AuthService) {
    // this.setupErrorReporting();

    const testsToRun = {
      // '[Authorization Service Integration Test] LOGIN': () => {this.integrationTestAuthServiceLogin(authService);},
      // '[Authorization Service Integration Test] REGISTER': () => {this.integrationTestAuthServiceRegister(authService);},
      '[Authorization Service Integration Test] REGISTER WITH ALREADY IN-USE EMAIL': () => {this.integrationTestAuthServiceRegisterAlreadyUsed(authService);},
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
