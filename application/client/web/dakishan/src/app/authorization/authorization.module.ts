import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18NextModule } from 'angular-i18next';
import { AuthorizationComponent } from './authorization.component';
import { UpdateauthorizationComponent } from './updateauthorization/updateauthorization.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
AgGridModule.withComponents([]),
NgSelectModule,
CommonModule,
FormsModule,
ReactiveFormsModule,
RouterModule,
I18NextModule.forRoot()
],
  declarations: [
UpdateauthorizationComponent,
AuthorizationComponent
]
  
  
})
export class AuthorizationModule { }