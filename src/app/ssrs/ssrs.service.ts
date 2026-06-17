import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SsrsService {
  private apiUrl = 'http://localhost:3000/reports/2';

  constructor(private http: HttpClient) {}

  getReportConfig() {
    return this.http.get<any>(this.apiUrl);
  }
}
