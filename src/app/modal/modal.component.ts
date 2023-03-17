import { Component, ElementRef } from '@angular/core';

import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  public modalId: string = 'add-user';

  constructor(public modalService: ModalService, private el: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }

  public closeModal(): void {
    this.modalService.toggleModal(this.modalId);
  }
}
