import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class userService {
  private API = `http://localhost:3000/users`;

  private http = inject(HttpClient);

  getUsers(page: number, limit: number) {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http.get<any>(this.API, { params })
  }

  
}
