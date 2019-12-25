// export enum GoodsImageType {
//   'imageFileToUpload' = 'imageFileToUpload',
//   'uploadedImage' = 'uploadedImage'
// }
//
// export abstract class GoodsImage {
//   protected _id?: string;
//   protected _type: GoodsImageType;
//   protected _src: File | string;
//   protected _rotate = 0;
//
//   public get type() { return this._type; }
//   public abstract get src();
//   public abstract get rotate();
//   public abstract set rotate(degree: number);
//
//   protected constructor(src: File | string) {
//     this._src = src;
//   }
// }
//
// export class ImageFileToUpload extends GoodsImage {
//   public get src(): File { return this._src as File; }
//   public get rotate(): number { return this._rotate; }
//   public set rotate(degree: number) { this._rotate = degree; }
//
//   constructor(file: File, rotate = 0) {
//     super(file);
//     this._type = GoodsImageType.imageFileToUpload;
//     this._rotate = rotate;
//   }
// }
//
// export class UploadedImage extends GoodsImage {
//   public get src(): string { return this._src as string; }
//   public get rotate(): number { return this._rotate; }
//   public set rotate(degree: number) { this._rotate = degree; }
//
//   constructor(url: string) {
//     super(url);
//     this._type = GoodsImageType.uploadedImage;
//     this._rotate = 0; // to parse from url
//   }
// }
