import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { IUser } from '../models/user.interface';
import { UsersQuery } from '../state/users.query';
import { UsersStore } from '../state/users.store';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users$: Observable<IUser[]> = of([]);

  constructor(private usersQuery: UsersQuery, private usersStore: UsersStore) {}

  public getUsers(): Observable<IUser[]> {
    this.users$ = this.usersQuery.getUsers();
    return this.users$;
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
