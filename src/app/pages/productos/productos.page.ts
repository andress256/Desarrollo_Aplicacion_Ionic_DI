import { Component, OnInit, signal } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular';
import { ProductsService } from '../../services/products';
import { Product } from '../../models/product.interface';

@Component({
  standalone: true,
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  imports: [NgFor, IonContent, IonGrid, IonRow, IonCol]
})
export class ProductosPage implements OnInit {
  products = signal<Product[]>([]);

  constructor(
    private productService: ProductsService
  ) {}

  async ngOnInit() {
    try {
      const data = await this.productService.getProducts();
      console.log('Productos:', data);
      this.products.set(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  }
}