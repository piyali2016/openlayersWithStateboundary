import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent {
  @Input() label: string;
  @Input() options: { label: string, value: string }[];
  selectedOptions = new FormControl();

  displaySelectedText(selectedValues: string[]): string {
    if (selectedValues && selectedValues.length) {
      if (selectedValues.length === 1 && selectedValues[0] === 'all') {
        return 'ALL';
      }
      return selectedValues.length + ' options selected';
    }
    return '';
  }

  ngOnInit() {
    // Pre-select "All" option initially
    this.selectedOptions.setValue(['all']);
  }
}
