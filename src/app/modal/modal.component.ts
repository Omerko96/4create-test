import { Component, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  public modalId: string = 'add-user';

  public userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    active: new FormControl('active', [Validators.required]),
  });

  @Input() usersCount: number | undefined = 0;

  constructor(public modalService: ModalService, private el: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    document.body.removeChild(this.el.nativeElement);
  }

  public closeModal(): void {
    this.userForm.reset();
    this.modalService.toggleModal(this.modalId);
  }

  public submit(): void {
    if (!this.userForm.valid) return;

    const user = {
      id: (this.usersCount as number) + 1,
      name: this.userForm.get('name')?.value,
      active: this.userForm.get('active')?.value,
    };
  }
}
