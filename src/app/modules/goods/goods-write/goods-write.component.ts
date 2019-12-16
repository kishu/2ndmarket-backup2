import { Component, OnInit } from '@angular/core';
import { GoodsCategory, GoodsCondition, GoodsDelivery, GoodsPurchaseTime, NewGoods } from '@app/core/model/goods';
import { AuthService } from '@app/core/http';
import { UserService } from '@app/core/http/user.service';

import { firestore } from 'firebase/app';

@Component({
  selector: 'app-goods-write',
  templateUrl: './goods-write.component.html',
  styleUrls: ['./goods-write.component.scss']
})
export class GoodsWriteComponent implements OnInit {
  public goods: NewGoods;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    const userId = this.authService.currentUser.id;
    const userRef = this.userService.getDocRef(userId);
    this.goods = {
      user: userRef,
      title: '',
      public: false,
      category: GoodsCategory.undefined,
      purchaseTime: GoodsPurchaseTime.undefined,
      condition: GoodsCondition.undefined,
      price: 0,
      delivery: GoodsDelivery.undefined,
      deliveryEtc: '',
      images: [],
      contact: '',
      favoritesCnt: 0,
      commentCnt: 0,
      created: firestore.FieldValue.serverTimestamp(),
      updated: firestore.FieldValue.serverTimestamp()
    };
  }

  ngOnInit() {
  }

}
