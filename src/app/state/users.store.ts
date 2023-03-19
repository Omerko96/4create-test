import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

import { IUser } from '../models/user.interface';

export interface UserState {
  users: IUser[];
}

export function createInitialState(): UserState {
  return {
    users: [
      {
        id: 1,
        name: 'John',
        active: true,
      },
      {
        id: 2,
        name: 'Jane',
        active: true,
      },
      {
        id: 3,
        name: 'Bob',
        active: false,
      },
    ],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'users' })
export class UsersStore extends Store<UserState> {
  constructor() {
    super(createInitialState());
  }
}
