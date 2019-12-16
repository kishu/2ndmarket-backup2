import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GoodsWriteComponent } from './goods-write/goods-write.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'goods/write', component: GoodsWriteComponent },
    ])
  ],
  exports: [RouterModule]
})
export class GoodsRoutingModule { }
