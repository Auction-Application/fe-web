import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigureLotApi {
  readonly #httpClient = inject(HttpClient);

  createAuctionLot(auctionLot: any) {
    return this.#httpClient.post<any>(`v1/auction-lot`, auctionLot).pipe(
      tap((res) => {
        console.log(res);
      }),
    );
  }
}
