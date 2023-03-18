import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../models/user.interface';

import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import { ModalService } from '../services/modal.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public users$: Observable<IUser[]> = new Observable();

  private refreshUsers$ = new BehaviorSubject<boolean>(true);

  public enableAddUserButton: boolean = false;

  constructor(
    public modalService: ModalService,
    public usersService: UsersService
  ) {
    this.users$ = this.refreshUsers$.pipe(
      switchMap(() => {
        // update enableAddUserButton if users count is less than 5 or there are inactive users
        this.enableAddUserButton =
          this.usersService.usersCount < 5 &&
          this.usersService.inactiveUsersCount === 0;
        return this.usersService.getUsers();
      })
    );
  }

  ngOnInit(): void {
    this.modalService.register('add-user');
  }

  ngOnDestroy(): void {
    this.modalService.unregister('add-user');
  }

  public openModal(event: Event): void {
    event.preventDefault();

    this.modalService.toggleModal('add-user');
  }

  public refreshUsers(): void {
    this.refreshUsers$.next(true);
  }

  public deleteUser(id: number): void {
    this.usersService.deleteUser(id);
    this.refreshUsers();
    this.enableAddUserButton = this.usersService.usersCount < 5;
  }

  public updateUser(id: number): void {
    this.usersService.updateUser(id);
    this.refreshUsers();
  }
}
