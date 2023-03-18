import { Injectable } from '@angular/core';

import { map, Observable, of } from 'rxjs';

import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: IUser[] = [
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
  ];

  public get usersCount(): number {
    return this.users.length;
  }

  public get inactiveUsersCount(): number {
    return this.users.filter((user) => !user.active).length;
  }

  public getUsers(): Observable<IUser[]> {
    return of(this.users);
  }

  public addUser(user: IUser): void {
    this.users.push(user);
  }

  public deleteUser(id: number): void {
    this.users = this.users.filter((user) => user.id !== id);
  }

  public updateUser(id: number): void {
    this.users.map((user) =>
      user.id === id ? (user.active = !user.active) : user
    );
  }
}
