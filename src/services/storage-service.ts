import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local-user';
import { STORAGE_KEYS } from '../config/storage-keys.config';

@Injectable()
export class StorageService {

  /**
   * obtem token usuário logado
   */
  getLocalUser(): LocalUser {
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
  setLocalUser(localUser: LocalUser) {
    if (localUser == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
    }
  }

}
