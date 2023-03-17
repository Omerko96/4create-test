import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../models/user.interface';

import { Observable } from 'rxjs';

import { ModalService } from '../services/modal.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public users$: Observable<IUser[]>;

  constructor(
    private modalService: ModalService,
    public usersService: UsersService
  ) {
    this.users$ = this.usersService.getUsers();
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
}
