import { v4 as uuid } from 'uuid';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { CloudinaryService } from '@app/core/http/cloudinary.service';
import { Goods, GoodsCategory, GoodsCondition, GoodsDelivery, GoodsPurchaseTime, NewGoods } from '@app/core/model/goods';

@Component({
  selector: 'app-goods-form',
  templateUrl: './goods-form.component.html',
  styleUrls: ['./goods-form.component.scss']
})
export class GoodsFormComponent implements OnInit {
  @Input() private goods: Goods | NewGoods;
  public goodsForm: FormGroup;
  public goodsCategory = GoodsCategory;
  public goodsPurchaseTime = GoodsPurchaseTime;
  public goodsCondition = GoodsCondition;
  public goodsDelivery = GoodsDelivery;
  public imageFileMap = new Map<string, File>();
  public submitting = false;

  get contact() { return this.goodsForm.get('contact'); }
  get delivery() { return this.goodsForm.get('delivery'); }
  get deliveryEtc() { return this.goodsForm.get('deliveryEtc'); }
  get title() { return this.goodsForm.get('title'); }

  constructor(
    private fb: FormBuilder,
    private cloudinaryService: CloudinaryService
  ) {
  }

  ngOnInit() {
    const g = this.goods;
    this.goodsForm = this.fb.group({
      title: [g.title],
      public: [g.public],
      category: [g.category],
      purchaseTime: [g.purchaseTime],
      condition: [g.condition],
      delivery: [g.delivery],
      deliveryEtc: [g.deliveryEtc],
      contact: [g.contact]
    });
  }

  onChangeImage(e: Event) {
    const fileList = (e.target as HTMLInputElement).files;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < fileList.length; i++) {
      const id = uuid();
      this.imageFileMap.set(id, fileList[i]);
    }
  }

  test() {
    const files = Array.from(this.imageFileMap.values());
    const progress$ = this.cloudinaryService.upload(files);
    progress$.subscribe(p => {
      console.log(p);
    });
  }

  onSubmit() {
    this.goods = { ...this.goods, ...this.goodsForm.value };
  }

}
