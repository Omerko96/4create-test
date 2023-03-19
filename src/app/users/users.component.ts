import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../models/user.interface';

import { Observable, switchMap, map } from 'rxjs';

import { ModalService } from '../services/modal.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public users$: Observable<IUser[]> = new Observable();

  public enableAddUserButton: boolean = false;

  constructor(
    public modalService: ModalService,
    public usersService: UsersService
  ) {
    this.users$ = this.usersService.getUsers().pipe(
      switchMap(() => {
        return this.usersService.getUsers();
      }),
      map((users) => {
        this.enableAddUserButton =
          users.length < 5 && users.find((user) => user.active === false)
            ? false
            : true;
        return users;
      })
    );
  }

  ngOnInit(): void {
    this.modalService.register('add-user');
  }

  ngOnDestroy(): void {
    this.modalService.unregister('add-user');
  }

  public openModal(): void {
    this.modalService.toggleModal('add-user');
  }

  public deleteUser(id: number): void {
    this.usersService.deleteUser(id);
  }

  public updateUser(id: number): void {
    this.usersService.updateUser(id);
  }
}
