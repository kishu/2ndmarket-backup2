import { v1 as uuid } from 'uuid';
import * as arrayMove from 'array-move';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// tslint:disable-next-line:max-line-length
import { Goods, GoodsCategory, GoodsCondition, GoodsDelivery, GoodsPurchaseTime, ImageFile, ImageType, ImageUrl, NewGoods } from '@app/core/model';
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
      images: [g.images],
      contact: [g.contact]
    });
  }

  onChangeImage(e: Event) {
    const fileList = (e.target as HTMLInputElement).files;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      // console.log('before resize', file.size, file);
      this.imageResizeService.resize(file).then(f => {
        this.goodsImages.push({
          type: ImageType.file,
          id: uuid(),
          file: f,
          rotate: 0
        });
        // console.log('after resize', f.size, f);
      });
    }
  }

  onClickRotateImage(image: ImageFile, degree: number) {
    image.rotate = (image.rotate + degree) % 360;
  }

  onClickMoveImage(from: number, to: number) {
    arrayMove(this.goodsImages, from, to);
  }

  onClickDeleteImage(idx: number) {
    this.goodsImages.splice(idx, 1);
  }

  upload() {
    const imageFiles = this.goodsImages.filter(img => img.type === ImageType.file);
    // const promises = imageFiles.map((img: ImageFile) => {
    //   return this.imageResizeService.rotate(img.file, img.rotate);
    // });
    // return Promise.all(promises).then(files => {
    imageFiles.forEach((img: ImageFile) => {
      this.cloudinaryService.upload(img.file, img.rotate, `id=${img.id}`).subscribe(e => {
        if (e.type === HttpEventType.UploadProgress) {
          console.log(e);
          this.uploadedPercent = Math.round(100 * e.loaded / e.total);
        } else if (e.type === HttpEventType.Response) {
          console.log(e);
          // res.body.eager[0].secure_url;
          this.uploadedFileCount = this.uploadedFileCount + 1;
        } else {
          console.log('etc', e);
        }
      });
    });
    // });
  }

  onSubmit() {
    this.goods = { ...this.goods, ...this.goodsForm.value };
  }

}
