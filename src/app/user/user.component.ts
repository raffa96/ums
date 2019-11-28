import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tr[app-user]',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: IUser;

  @Output() modify = new EventEmitter();

  @Output() delete = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() { }

  showUserDetails() {
    this.router.navigate(['user', this.user.id, 'details']);
  }

  modifyUser() {
    this.router.navigate(['user', this.user.id, 'edit']);

    this.modify.emit(this.user);
  }

  deleteUser() {
    this.delete.emit(this.user);
  }
}
