import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public users$: Observable<IUser[]> = new Observable();

  constructor() {}

  public getUsers(): Observable<IUser[]> {
    return this.users$.pipe(
      startWith([
        {
          id: 1,
          name: 'John Doe',
          active: true,
        },
        {
          id: 2,
          name: 'Jane Doe',
          active: true,
        },
        {
          id: 3,
          name: 'Mike Doe',
          active: false,
        },
      ])
    );
  }
}
