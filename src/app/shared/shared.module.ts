import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FromBytesPipe, ObjectURLPipe, SanitizerPipe } from './pipes';

@NgModule({
  declarations: [
    ObjectURLPipe,
    SanitizerPipe,
    FromBytesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ObjectURLPipe,
    SanitizerPipe,
    FromBytesPipe
  ]
})
export class SharedModule { }
