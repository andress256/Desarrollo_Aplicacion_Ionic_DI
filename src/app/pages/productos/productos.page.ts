import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular';
import { ProductsService } from '../../services/products';

@Component({
  standalone: true,
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  imports: [
    NgFor,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class ProductosPage implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductsService
  ) {}

  async ngOnInit() {
    this.products =
      await this.productService.getProducts();
  }
}