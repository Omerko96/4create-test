import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { IUser } from '../models/user.interface';
import { UsersQuery } from '../state/users.query';
import { UsersStore } from '../state/users.store';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private usersQuery: UsersQuery, private usersStore: UsersStore) {}

  public getUsers(): Observable<IUser[]> {
    return this.usersQuery.getUsers();
  }

  public addUser(user: IUser): void {
    this.usersStore.update((state) => {
      return {
        ...state,
        users: [...state.users, user],
      };
    });
  }

  public deleteUser(id: number): void {
    this.usersStore.update((state) => {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== id),
      };
    });
  }

  public updateUser(id: number): void {
    this.usersStore.update((state) => {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        ),
      };
    });
  }
}
