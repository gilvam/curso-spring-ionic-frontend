import { Injectable } from '@angular/core';
import { StorageService } from '../storage-service';
import { Cart } from '../../models/cart';
import { ProductDto } from '../../models/product.dto';

@Injectable()
export class CartService {
  constructor(private storage: StorageService) {
  }

  createOrClearCart(): Cart {
    const cart: Cart = { items: [] };
    this.storage.setCart(cart);
    return cart;
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart();
    if (cart == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduct(product: ProductDto): Cart {
    const cart = this.getCart();
    const position = cart.items.findIndex(x => x.product.id === product.id);
    if (position === -1) { // se não existe na lista
      cart.items.push({ amount: 1, product: product });
    }
    this.storage.setCart(cart);
    return cart;
  }

  removeProduct(product: ProductDto): Cart {
    const cart = this.getCart();
    const position = cart.items.findIndex(x => x.product.id === product.id);
    if (position !== -1) { // se produto existe na lista
      cart.items.splice(position, 1);
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantityProduct(product: ProductDto): Cart {
    const cart = this.getCart();
    const position = cart.items.findIndex(x => x.product.id === product.id);
    if (position !== -1) { // se produto existe na lista
      cart.items[position].amount++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantityProduct(product: ProductDto): Cart {
    let cart = this.getCart();
    const position = cart.items.findIndex(x => x.product.id === product.id);
    if (position !== -1) { // se produto existe na lista
      cart.items[position].amount--;
      if (cart.items[position].amount < 1) {
        cart = this.removeProduct(product);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  total(): number {
    const cart = this.getCart();
    let sum = 0;
    cart.items.map(item => {
      sum += item.product.value * item.amount;
    });
    return sum;
  }
}
