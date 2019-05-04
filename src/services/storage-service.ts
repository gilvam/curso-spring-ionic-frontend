import { Injectable } from '@angular/core';
import { LocalUserModel } from '../models/local-user.model';
import { STORAGE_KEYS } from '../config/storage-keys.config';
import { Cart } from '../models/cart';

@Injectable()
export class StorageService {

  /**
   * obtem token usuário logado
   */
  getLocalUser(): LocalUserModel {
    const usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  /**
   * armazena token usuário
   */
  setLocalUser(localUser: LocalUserModel) {
    if (localUser == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
    }
  }

  /**
   * obtem produtos do carrinho
   */
  getCart(): Cart {
    const str = localStorage.getItem(STORAGE_KEYS.cart);
    if (str == null) {
      return null;
    } else {
      return JSON.parse(str);
    }
  }

  /**
   * armazena produtos do carrinho
   */
  setCart(cart: Cart) {
    if (cart == null) {
      localStorage.removeItem(STORAGE_KEYS.cart);
    } else {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    }
  }
}
