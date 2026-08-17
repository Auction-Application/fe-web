export type LotImage = {
  sha256: string;
  fileName: string;
  clientFileId: number;
  fileSize: number;
};

export type UploadFiles = {
  lotId: string;
  lotImages: LotImage[];
};

export type PresignedFile = {
  uploadFile: LotImage;
  presignedUploadUrl: SinglePresignedFile | MultiPresignedFile;
};

export type SinglePresignedFile = {
  single: RequestUrl;
};

export type MultiPresignedFile = {
  multi: {
    multiParts: MultiPart[];
    partSize: string;
    multipartAttemptId: string;
  };
};

export type MultiPart = {
  request: RequestUrl;
  part: number;
};

export type PutMethod = 'PUT';

export type RequestUrl = {
  url: string;
  method: PutMethod;
  signedHeader: null;
};
