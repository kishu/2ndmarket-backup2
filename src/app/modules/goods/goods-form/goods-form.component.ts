import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Goods, NewGoods } from '@app/core/model/goods';

@Component({
  selector: 'app-goods-form',
  templateUrl: './goods-form.component.html',
  styleUrls: ['./goods-form.component.scss']
})
export class GoodsFormComponent implements OnInit {
  @Input() goods: Goods | NewGoods;
  public goodsForm: FormGroup;

  get title() { return this.goodsForm.get('title'); }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    const g = this.goods;
    this.goodsForm = this.fb.group({
      title: [g.title],
      public: [g.public],
      category: [g.category]
    });
  }

  onSubmit() {

  }

}
