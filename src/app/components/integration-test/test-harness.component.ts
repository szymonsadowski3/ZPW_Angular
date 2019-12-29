import {Component} from '@angular/core';
import chai from 'chai';
import {AuthService} from "../../services/auth.service";
import forEach from 'lodash/forEach';

@Component({
  selector: 'test-harness',
  templateUrl: './test-harness.component.html',
})
export class TestHarness {
  testResults = [];

  assert(predicate, message) {
    try {
      chai.assert(predicate, message);
      this.testResults.push({type: 'assert', status: 'PASS', msg: message});
    } catch(error) {
      console.error(error);
      this.testResults.push({type: 'assert', status: 'FAIL', msg: JSON.stringify(error)});
    }
  }

  integrationTestAuthService(authService: AuthService) {
    const credentials = {email: 'szymonsadowski3@gmail.com', password: 'bimber12'};
    authService.login(credentials).then(() => {
      this.assert(authService.getUser() === credentials.email, 'should allow user to log in');
    });
  }

  constructor(private authService: AuthService) {
    const testsToRun = {
      'Authorization Service Integration Test': () => {this.integrationTestAuthService(authService);}
    };

    forEach(testsToRun, (testFunc, testName) => {
      this.testResults.push({type: 'test', name: testName});
      console.log(`Running test ${testName}`);
      testFunc();
    });

    // testsToRun.forEach(test => {
    //   console.log('running test...');
    //   test();
    // });
  }
}
