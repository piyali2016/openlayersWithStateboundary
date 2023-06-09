import { Component, Input, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('select') selectElementRef!: ElementRef;

  ngOnInit() {
    // Pre-select "All" option initially
    this.selectedOptions.setValue(['all']);
    this.updateDisplayText();
  }

  onSelectionChange() {
    this.updateDisplayText();
  }

  updateDisplayText() {
    const selectElement = this.selectElementRef.nativeElement as HTMLSelectElement;
    const allOption = selectElement.querySelector('option[value="all"]');

    if (allOption && allOption.selected) {
      allOption.textContent = 'ALL';
    } else if (allOption) {
      allOption.textContent = 'All';
    }
  }
}
