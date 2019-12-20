import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageResizeService {
  constructor() { }

  resizeImageFile(imageFile: File): Subject<File> {
    const resizedImageFile$ = new Subject();
    const image = new Image();
    image.src = window.URL.createObjectURL(imageFile);
    let resizable = false;
    image.addEventListener('load', () => {
      let width = image.width;
      let height = image.height;
      if (image.width > image.height && image.width > 720) {
        width = 720;
        height = image.height * (image.width / width);
        resizable = true;
      } else if (image.height >= image.width && image.height > 720) {
        height = 720;
        width = image.width * (image.height / height);
        resizable = true;
      }
      if (resizable) {
        // step 1 - resize to 50%
        const canvas1 = document.createElement('canvas');
        const context1 = canvas1.getContext('2d');
        canvas1.width = width * 0.5;
        canvas1.height = height * 0.5;
        context1.drawImage(image, 0, 0, canvas1.width, canvas1.height);
        // step 2
        const canvas2 = document.createElement('canvas');
        canvas2.width = canvas1.width * 0.5;
        canvas2.width = canvas1.width * 0.5;
        const context2 = canvas1.getContext('2d');
        context2.drawImage(canvas1, 0, 0, canvas1.width, canvas2.height);
        canvas2.toBlob(b => {
          resizedImageFile$.next(new File([b], imageFile.name));
          resizedImageFile$.complete();
        });
      } else {
        resizedImageFile$.next(imageFile);
        resizedImageFile$.complete();
      }
    });
    return resizedImageFile$ as Subject<File>;
  }
}
