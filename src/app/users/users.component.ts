import { Component, OnDestroy, OnInit } from '@angular/core';

import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(private modalService: ModalService) {}

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
