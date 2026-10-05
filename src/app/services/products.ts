import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsResponse } from '../models/product.interface';

@Injectable({ providedIn: 'root' })
export class Products {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products';

  getProducts(limit = 10, skip = 0): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>(this.apiUrl, {
      params: { limit, skip },
    });
  }
}
