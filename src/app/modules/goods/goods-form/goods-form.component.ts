import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Goods, GoodsCategory, GoodsCondition, GoodsDelivery, GoodsPurchaseTime, ImageFileItem, NewGoods } from '@app/core/model';
import { CloudinaryService } from '@app/core/http/cloudinary.service';
import { ImageResizeService } from '@app/shared/services';
import { HttpEventType } from '@angular/common/http';

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
  public imageFiles: ImageFileItem[] = [];
  public uploadFiles: File[] = [];
  public uploadedFileCount = 0;
  public uploadedPercent = 0;
  public submitting = false;

  get contact() { return this.goodsForm.get('contact'); }
  get delivery() { return this.goodsForm.get('delivery'); }
  get deliveryEtc() { return this.goodsForm.get('deliveryEtc'); }
  get title() { return this.goodsForm.get('title'); }

  get imageFileCount() { return this.imageFiles.length; }
  get imageFileSize() { return this.imageFiles.reduce((a, c) => (a + c.file.size), 0); }

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
      console.log('before resize', file.size, file);
      this.imageResizeService.resize(file).then(f => {
        this.imageFiles.push({ rotate: 0, file: f });
        console.log('after resize', f.size, f);
      });
    }
  }

  onClickRotateImage(e: Event, imageFileItem: ImageFileItem, degree: number) {
    e.preventDefault();
    imageFileItem.rotate = (imageFileItem.rotate + degree) % 360;
  }

  onClickDeleteImage(e: Event, idx: number) {
    e.preventDefault();
    this.imageFiles.splice(idx, 1);
  }

  upload() {
    const promises = this.imageFiles.map(i => {
      return this.imageResizeService.rotate(i.file, i.rotate);
    });
    Promise.all(promises).then(files => {
      for (const f of files) {
        this.cloudinaryService.upload(f).subscribe(e => {
          if (e.type === HttpEventType.UploadProgress) {
            this.uploadedPercent = Math.round(100 * e.loaded / e.total);
          } else if (e.type === HttpEventType.Response) {
            this.uploadedFileCount = this.uploadedFileCount + 1;
          }
        });
      }
    });
  }

  onSubmit() {
    this.goods = { ...this.goods, ...this.goodsForm.value };
  }

}
