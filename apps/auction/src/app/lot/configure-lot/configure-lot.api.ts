import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import {
  PartEtag,
  PostCreateLotResponse,
  PostPresignedUrlsResponse,
} from './lot.api.types';
import { UploadFiles } from './lot.types';

@Injectable({
  providedIn: 'root',
})
export class ConfigureLotApi {
  readonly #httpClient = inject(HttpClient);

  createAuctionLot(auctionLot?: any) {
    const testAuctionLot = {
      title: 'test auction title',
      category: 'test auction category',
      description: 'test auction description',
      bidOpeningPrice: 300,
    };
    return this.#httpClient
      .post<PostCreateLotResponse>(`v1/auction-lots`, testAuctionLot)
      .pipe(
        tap((res) => {
          console.log(res);
        }),
      );
  }

  getPresignedUrls(auctionId: string, uploadFiles: UploadFiles) {
    return this.#httpClient
      .post<PostPresignedUrlsResponse>(
        `v1/auction-lots/media/presigned-urls`,
        uploadFiles,
      )
      .pipe(
        tap((res) => {
          console.log(res);
        }),
      );
  }

  completeMultiPartUpload(multiPartUploadId: string, parts: PartEtag[]) {
    return this.#httpClient
      .post<unknown>(
        `v1/auction-lots/media/upload-attempts/multiparts/${multiPartUploadId}`,
        { parts },
      )
      .pipe(
        tap((res) => {
          console.log(res);
        }),
      );
  }
}
