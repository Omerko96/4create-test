import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ModalService } from '../services/modal.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Output() refreshUsers: EventEmitter<void> = new EventEmitter<void>();

  public modalId: string = 'add-user';

  public userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    active: new FormControl('inactive', [Validators.required]),
  });

  @Input() usersCount: number | undefined = 0;

  constructor(
    public modalService: ModalService,
    private el: ElementRef,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.userForm.reset();
  }

  public closeModal(): void {
    this.modalService.toggleModal(this.modalId);
  }

  public submit(): void {
    if (!this.userForm.valid) {
      this.userForm.get('name')?.markAsTouched();
      return;
    }

    const user = {
      id: (this.usersCount as number) + 1,
      name: this.userForm.get('name')?.value,
      active: this.userForm.get('active')?.value === 'active' ? true : false,
    };

    this.usersService.addUser(user);
    this.refreshUsers.emit();
    this.closeModal();
  }
}
