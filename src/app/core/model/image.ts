export enum ImageType {
  'file' = 'file',
  'url' = 'url'
}

export interface ImageFile {
  type: ImageType;
  id: string;
  file: File;
  rotate: number;
  url?: string;   // assign after upload
}

export interface ImageUrl {
  type: ImageType;
  url: string;
}
