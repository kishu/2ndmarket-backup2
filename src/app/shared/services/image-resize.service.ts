import { Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageResizeService {
  constructor() { }

  public rotate(file: File, degree: number): Promise<File> {
    if (Math.abs(degree) === 0) {
      return Promise.resolve(file);
    } else {
      return new Promise((resolve, reject) => {
        const orientationChange = Math.abs(degree) === 90 || Math.abs(degree) === 270;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.addEventListener('load', () => {
          canvas.width = orientationChange ? image.height : image.width;
          canvas.height = orientationChange ? image.width : image.height;
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(degree * Math.PI / 180);
          ctx.drawImage(image, -image.width / 2, -image.height / 2);
          canvas.toBlob(b => resolve(new File([b], file.name, {type: file.type})));
        });
      });
    }
  }

  public resize(file: File, imageWidthLimit = 720, leastFileSize = 1048576): Promise<File> {
    if (file.size < leastFileSize) {
      return Promise.resolve(file);
    } else {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.addEventListener('load', () => {
          let toWidth = image.width;
          let toHeight = image.height;
          if (image.width > imageWidthLimit) {
            toWidth = imageWidthLimit;
            toHeight = image.height * (toWidth / image.width);
          }
          // 이미지 사이즈를 변환해야 한다면
          if (toWidth !== image.width) {
            // step 1
            const canvas1 = document.createElement('canvas');
            const ctx1 = canvas1.getContext('2d');
            canvas1.width = image.width - ((image.width - toWidth) * 0.5);
            canvas1.height = image.height - ((image.height - toHeight) * 0.5);
            ctx1.drawImage(image, 0, 0, canvas1.width, canvas1.height);
            console.log('resize step 1', image.width, image.height, canvas1.width, canvas1.height);
            // step 2
            const canvas2 = document.createElement('canvas');
            const ctx2 = canvas2.getContext('2d');
            canvas2.width = toWidth;
            canvas2.height = toHeight;
            ctx2.drawImage(canvas1, 0, 0, canvas2.width, canvas2.height);
            console.log('resize step 2', canvas1.width, canvas1.height, canvas2.width, canvas2.height);
            canvas2.toBlob(b => resolve(new File([b], file.name, {type: file.type})));
          } else {
            resolve(file);
          }
        });
      });
    }
  }

}
