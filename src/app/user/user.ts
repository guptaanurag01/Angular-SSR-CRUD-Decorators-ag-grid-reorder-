import { Component, inject } from '@angular/core';
import { userService } from '../user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.sass',
})
export class User {
  users: any[] = [];
  page = 1;
  limit = 10;
  totalRecords = 0;

  private userService = inject(userService);
  ngOnInit() {
    this.loadUsers()
  };

  loadUsers() {
    this.userService.getUsers(this.page, this.limit)
      .subscribe(res => {
        this.users = res.data;
        this.totalRecords = res.totalRecords;
      });
  }

  nextPage() {
    if (this.page * this.limit < this.totalRecords) {
      this.page++;
      this.loadUsers()
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }
}
