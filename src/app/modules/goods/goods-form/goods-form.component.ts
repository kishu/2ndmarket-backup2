import { v4 as uuid } from 'uuid';
import * as arrayMove from 'array-move';
import * as faker from 'faker';
import { merge, Observable, Subject } from 'rxjs';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Goods,
  GoodsCategory,
  GoodsCondition,
  GoodsDelivery,
  GoodsPurchaseTime,
  ImageFile,
  ImageType,
  ImageUrl,
  NewGoods
} from '@app/core/model';
import { CloudinaryService } from '@app/core/http/cloudinary.service';
import { ImageResizeService } from '@app/shared/services';
import { HttpEventType } from '@angular/common/http';

declare type GoodsImage = (ImageFile | ImageUrl);

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
  public goodsImages: GoodsImage[] = [];
  public uploadedFileCount = 0;
  public uploadedPercent = 0;
  public submitting = false;
  get contact() { return this.goodsForm.get('contact'); }
  get delivery() { return this.goodsForm.get('delivery'); }
  get deliveryEtc() { return this.goodsForm.get('deliveryEtc'); }
  get title() { return this.goodsForm.get('title'); }
  get imageFileCount() {
    return this.goodsImages
    .filter(i => typeof i !== 'string' )
    .length;
  }
  get imageFileSize() {
    return this.goodsImages
      .filter(i => typeof i !== 'string' )
      .reduce((a, c) => (a + (c as ImageFile).file.size), 0);
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private imageResizeService: ImageResizeService,
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
      images: [g.images], // this will re-assign when submit
      contact: [g.contact]
    });
    this.goodsImages = g.images.map(url => ({ type: 'url', url, rotate: 0 } as ImageUrl));
  }

  onChangeImage(e: Event) {
    const fileList = (e.target as HTMLInputElement).files;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      this.imageResizeService.resize(file).then(f => {
        this.goodsImages.push({
          type: ImageType.file,
          id: uuid(),
          file: f,
          rotate: 0
        });
      });
    }
  }

  onClickRotateImage(image: ImageFile, degree: number) {
    image.rotate = (image.rotate + degree) % 360;
  }

  onClickMoveImage(from: number, to: number) {
    if (to > 0 && to < this.goodsImages.length) {
      this.goodsImages = arrayMove(this.goodsImages, from, to);
    }
  }

  onClickDeleteImage(idx: number) {
    this.goodsImages.splice(idx, 1);
  }

  upload(): Observable<null> {
    const uploaded$ = new Subject<null>();
    const goodsImageFiles = this.goodsImages.filter(image => image.type === ImageType.file);
    console.log('asdf', goodsImageFiles, goodsImageFiles.length);
    if (goodsImageFiles.length === 0) {
      uploaded$.next();
      uploaded$.complete();
      console.log('234234234');
      return uploaded$;
    } else {
      const uploads$ = goodsImageFiles.map((image: ImageFile) => {
        return this.cloudinaryService.upload(image.file, image.rotate, `id=${image.id}`);
      });
      merge(...uploads$).subscribe((e: any) => {
        if (e.type === HttpEventType.UploadProgress) {
          this.uploadedPercent = Math.round(100 * e.loaded / e.total);
        } else if (e.type === HttpEventType.Response) {
          // complete image file upload
          const id = e.body.context.custom.id;
          const url = e.body.eager[0].secure_url;
          this.goodsImages.find((i: ImageFile) => i.id === id).url = url;
          this.uploadedFileCount = this.uploadedFileCount + 1;
          if (this.uploadedFileCount === goodsImageFiles.length) {
            uploaded$.next();
            uploaded$.complete();
          }
        }
      });
      return uploaded$;
    }
  }

  onSubmit() {
    console.log('1');
    this.upload().subscribe(() => {
      console.log('2');
      const images = this.goodsImages.map(i => i.url);
      this.goodsForm.get('images').setValue(images);
      this.goods = { ...this.goods, ...this.goodsForm.value };
      console.log(this.goods);
    }, (err) => {
      console.log(err);
    });
  }

  faker() {
    const f = this.goodsForm;
    f.get('title').setValue(faker.commerce.productName());
    f.get('public').setValue(faker.random.boolean());
    // tslint:disable-next-line:max-line-length
    f.get('category').setValue(faker.random.arrayElement(['appliances', 'household', 'beauty', 'home', 'women', 'man', 'fashion', 'luxury', 'kids']));
    f.get('purchaseTime').setValue(faker.random.arrayElement(['unknown', 'week', 'month', 'threeMonth', 'year', 'longAgo']));
    f.get('condition').setValue(faker.random.arrayElement(['unopend', 'almostNew', 'used']));
    f.get('delivery').setValue(faker.random.arrayElement(['directly', 'courier', 'etc']));
    f.get('contact').setValue(faker.address.streetAddress());
  }
}
