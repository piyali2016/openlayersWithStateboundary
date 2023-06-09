import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent implements OnInit {
  @Input() label: string;
  @Input() options: { label: string, value: string }[];
  selectedOptions = new FormControl();

  ngOnInit() {
    // Pre-select "All" option initially
    this.selectedOptions.setValue([0]);
  }

  onSelectionChange() {
    const allSelected = this.selectedOptions.value.includes(0);
    if (allSelected) {
      this.selectedOptions.setValue([0, ...this.selectedOptions.value.filter(value => value !== 0)]);
    }
  }

  onDropdownOpened() {
    const allSelected = this.selectedOptions.value.includes(0);
    if (allSelected) {
      setTimeout(() => {
        this.selectedOptions.setValue([...this.options.map(option => option.value)]);
      });
    }
  }

  getSelectedLabel(): string {
    const allSelected = this.selectedOptions.value.includes(0);
    if (allSelected) {
      return 'All';
    } else {
      return this.selectedOptions.value.length + ' options selected';
    }
  }
}
