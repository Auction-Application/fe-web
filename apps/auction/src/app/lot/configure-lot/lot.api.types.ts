import { LotImage, PresignedFile } from './lot.types';

export type PresignedUrl = {
  presignedFiles?: PresignedFile[];
  duplicateFiles?: LotImage[];
  alreadyUploadedFiles?: LotImage[];
};

export type PostPresignedUrlsResponse = {
  presignResult: PresignedUrl;
};

export type PostCreateLotResponse = {
  success: boolean;
  message: string;
  lotId: string;
};

export type PartEtag = {
  etag: string;
  part: number;
};
