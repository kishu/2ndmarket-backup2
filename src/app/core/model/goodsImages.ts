export interface GoodsImage {
  order: number;
  image: File | string; // file or url
  rotate: number;
}

export class GoodsImages {
  private images: GoodsImage[] = [];

  public add(img: GoodsImage) {
    this.images.push(img);
  }
}
