import { Injectable } from '@angular/core';

import { Query } from '@datorama/akita';

import { Observable } from 'rxjs';

import { UsersStore, UserState } from './users.store';

import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersQuery extends Query<UserState> {
  constructor(private userStore: UsersStore) {
    super(userStore);
  }

  public getUsers(): Observable<IUser[]> {
    return this.select((state) => state.users);
  }
}
