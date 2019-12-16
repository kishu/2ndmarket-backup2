import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsFormComponent } from './goods-form/goods-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoodsRoutingModule } from '@app/modules/goods/goods-routing.module';
import { GoodsWriteComponent } from './goods-write/goods-write.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    GoodsFormComponent,
    GoodsWriteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GoodsRoutingModule,
    SharedModule
  ]
})
export class GoodsModule { }
