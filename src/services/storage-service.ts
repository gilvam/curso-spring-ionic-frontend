import { Injectable } from '@angular/core';
import { LocalUserModel } from '../models/local-user.model';
import { STORAGE_KEYS } from '../config/storage-keys.config';

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

}
