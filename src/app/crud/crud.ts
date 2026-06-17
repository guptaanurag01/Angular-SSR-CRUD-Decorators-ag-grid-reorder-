// import { Component, inject, OnInit } from '@angular/core';
// import { crudService } from './CrudService';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormsModule, NgForm } from '@angular/forms';

// interface User{
//   id:number,
//   name:string,
//   email:string
// }

// @Component({
//   selector: 'app-crud',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './crud.html',
//   styleUrl: './crud.scss',
// })
// export class Crud implements OnInit{
//   private fb = inject(FormBuilder);
//   private crudService = inject(crudService);
  
//   user = this.crudService.userSubject$;
//   userForm: User = { id: 0, name: '', email: '' };
//   isEditMode = false;

//   ngOnInit(): void {
//     this.user = this.crudService.userSubject$;
//   };

//   addOrUpdate(form:NgForm):void{
//     if(this.isEditMode){
//       this.crudService.updateData(this.userForm);
//       this.isEditMode = false;
//     }else{
//       this.crudService.addData(this.userForm);
//     }

//     form.resetForm();
//     this.isEditMode = false;
//   };

//   editUser(user:User):void{
//     this.userForm = {...user};
//     this.isEditMode = true;
//   }

//   deleteUser(id:number):void{
//     if(confirm("Are you sure ?"))
//       this.crudService.delData(id)
//   }
// }









import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { crudService } from './CrudService';
import { validate } from '@angular/forms/signals';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crud.html',
  styleUrl: './crud.scss',
})
export class Crud implements OnInit {

  private fb = inject(FormBuilder);
  private crudService = inject(crudService);

  users = this.crudService.userSubject$;
  isEditMode = false;
  selectedId = 0;

  userForm!: FormGroup;

  ngOnInit(): void {
    this.userForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      acceptTerms: ["", Validators.requiredTrue]
    });
  }

  
  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  addOrUpdate(): void {
    this.userForm.markAllAsTouched();

    if (this.userForm.invalid) {
      return;
    }

    const formValue = this.userForm.value;

    if (this.isEditMode) {
      this.crudService.updateData({
        id: this.selectedId,
        ...formValue,
      });
    } else {
      this.crudService.addData(formValue);
    }

    this.userForm.reset();
    this.isEditMode = false;
    this.selectedId = 0;
  }

  editUser(user: User): void {
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
    });
    this.selectedId = user.id;
    this.isEditMode = true;
  }

  deleteUser(id: number): void {
    // if (confirm('Are you sure?')) {
      this.crudService.delData(id);
    // }
  }

  onReset(): void {
    this.isEditMode = false;
    this.userForm .reset();
  }

  
}

