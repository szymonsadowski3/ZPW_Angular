import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ocena-component',
  styleUrls: ['./ocena.component.css'],
  template: `
    <div>
      <star-rating 
        value="0" 
        checkedcolor="gold" 
        uncheckedcolor="gray" 
        size="24px" 
        readonly="{{this.readonly}}" 
        (rate)="onRate($event)"
      >
      </star-rating>
    </div>
  `,
})
export class OcenaComponent {
  @Output() ratingAdded = new EventEmitter<any>();
  @Input() readonly;

  onRate($event) {
      this.ratingAdded.emit($event.newValue);
  }
}
