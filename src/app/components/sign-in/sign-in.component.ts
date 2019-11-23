import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'sign-in-component',
  styleUrls: ['./sign-in.component.css'],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  @Output() ratingAdded = new EventEmitter<any>();
  @Input() readonly;

  onRate($event) {
      this.ratingAdded.emit($event.newValue);
  }
}
