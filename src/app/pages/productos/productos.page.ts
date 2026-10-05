import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonProgressBar,
} from '@ionic/angular';
import { Product, ProductsResponse } from '../../models/product.interface';
import { Products } from '../../services/products';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe, DecimalPipe, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonProgressBar,
  ],
})
export class ProductosPage implements OnInit {
  private productService = inject(Products);
  theme = inject(ThemeService);

  products: Product[] = [];
  total = 0;
  loading = false;
  error = '';

  // Paginación (reto 6)
  page = 1;
  pageSize = 10;

  // Vista (reto 10)
  vista: 'tabla' | 'tarjetas' = 'tabla';

  ngOnInit(): void {
    this.loadProducts();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  // Petición 2: unidades * precio, aplicando el porcentaje de descuento.
  stockValue(p: Product): number {
    return p.stock * p.price * (1 - p.discountPercentage / 100);
  }

  get pageStockValue(): number {
    return this.products.reduce((acc, p) => acc + this.stockValue(p), 0);
  }

  // Barra de stock de las tarjetas (0..1, tope en 100 unidades)
  stockRatio(p: Product): number {
    return Math.min(p.stock / 100, 1);
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    const skip = (this.page - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
      next: (response: ProductsResponse) => {
        this.products = response.products;
        this.total = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se han podido cargar los productos.';
        this.loading = false;
      },
    });
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
}