import { UserRef } from './user';
import { firestore } from 'firebase/app';

export enum GoodsCategory {
  appliances, // 가전제품, 디지털
  Household,  // 생활용품
  beauty,     // 뷰티
  home,       // 홈데코
  women,      // 여성의류
  man,        // 남성의류
  fashion,    // 패션잡화
  luxury,     // 명품, 주얼리
  kids        // 유아, 출산
}

export enum GoodsPurchaseTime {
  unknown,    // 알 수 없음
  week,       // 일주일 이내
  month,      // 한달 이내
  quarter,    // 석달 이내
  year,       // 일년 이내
  longAgo     // 오래전
}

export enum GoodsCondition {
  unopend,    // 미개봉
  almostNew,  // 거의 새제품
  used        // 사용감 있음
}

export enum GoodsDelivery {
  directly,   // 직거래
  courier     // 택배
}

export interface Goods {
  id: string;
  user: UserRef;
  name: string;
  category: GoodsCategory;
  purchaseTime: GoodsPurchaseTime;
  condition: GoodsCondition;
  price: number;
  delivery: GoodsDelivery | string;
  images: string[]; // url
  contact: string;
  favoritesCnt: number;
  commentCnt: number;
  created: firestore.Timestamp;
  updated: firestore.Timestamp;
}

export type NewGoods = Omit<Goods, 'id'>;
export type GoodsRef = firestore.DocumentReference;
