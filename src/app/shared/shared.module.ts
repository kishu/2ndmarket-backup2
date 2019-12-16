import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectURLPipe } from './pipes';

@NgModule({
  declarations: [
    ObjectURLPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ObjectURLPipe
  ]
})
export class SharedModule { }
