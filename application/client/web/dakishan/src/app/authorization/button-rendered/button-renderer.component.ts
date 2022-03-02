// Author: T4professor

import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button [disabled]="isDisabled" class="removeRow" style="color:white;background-color: red;
    border: none;" type="button" (click)="onClick($event)"><i class="fa fa-trash" aria-hidden="true"></i></button>
    `,
  styles: [
    // `removeRow: { color:white }`
  ]
})

export class ButtonRendererComponent implements ICellRendererAngularComp {

  params:any;
  label: String = '';
  isDisabled: Boolean = false;

  agInit(params:any): void {
    this.params = params;
    if (this.params.data.is_default) {
      this.isDisabled = this.params.data.is_default;
    }
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event:any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      };
      this.params.onClick(params);

    }
  }
}