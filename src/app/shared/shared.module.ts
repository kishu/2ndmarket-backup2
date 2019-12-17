import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectURLPipe } from './pipes';
import { SanitizerPipe } from './pipes/sanitizer.pipe';

@NgModule({
  declarations: [
    ObjectURLPipe,
    SanitizerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ObjectURLPipe,
    SanitizerPipe
  ]
})
export class SharedModule { }
