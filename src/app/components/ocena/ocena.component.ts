import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'ocena-component',
  styleUrls: ['./ocena.component.css'],
  template: `
    <div>
      <star-rating value="0" checkedcolor="gold" uncheckedcolor="gray" size="24px" readonly="false" (rate)="onRate($event)">
      </star-rating>
    </div>
  `,
})
export class OcenaComponent {
  @Output() ratingAdded = new EventEmitter<any>();

  onRate($event) {
      console.log(`Old Value:${$event.oldValue},
      New Value: ${$event.newValue},
      Checked Color: ${$event.starRating.checkedcolor},
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);

      this.ratingAdded.emit($event.newValue);
  }
}
