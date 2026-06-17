import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';

interface User{
  id:number,
  name:string,
  email:string
};

@Injectable({
  providedIn: 'root',
})
export class crudService {
  private keyStore = '_data';
  userSubject$ = signal<User[]>([]);

  constructor() { this.loadData() };

  private loadData() {
    const storeData = localStorage.getItem(this.keyStore);
    const data = storeData ? JSON.parse(storeData) : [];
    this.userSubject$.set(data);
  };

  getData():Observable<User[]> {
    return toObservable(this.userSubject$).pipe(map((user: any) => [...user]));
  };

  addData(user:User){
    const NewData = { ...user, id:Date.now()};
    const data =[...this.userSubject$(), NewData];
    this.saveToLocalStorageData(data);
  };

  updateData(user:User){
    const updateData = this.userSubject$().map(u => u.id === user.id ? { ...user} : u);
    this.saveToLocalStorageData(updateData);
  };

  delData(id:number){
    const deleteData = this.userSubject$().filter(u => u.id !== id);
    this.saveToLocalStorageData(deleteData);
  };

  saveToLocalStorageData(user:User[]){
    localStorage.setItem(this.keyStore, JSON.stringify(user));
    this.userSubject$.set(user);
  };

}
