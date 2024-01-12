import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FuncService {

  private apiUrl = 'https://localhost:44330/api/user';

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData)
  }

  getJobOptions(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/jobs`);
  }
  
  logInUser(userData: any): Observable<any>{
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<string>(`${this.apiUrl}/login`, userData, 
    {headers, responseType: 'text' as 'json'});
  }
  
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }

  sendRequest(userData: any): Observable<any> {
    return this.http.post(`https://localhost:44330/api/Worker/add-schedule-request`, userData)
  }
  getRequests(): Observable<any[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/dashboard`);
  }
  getSchedules(): Observable<any[]> {
    return this.http.get<Job[]>(`${this.apiUrl}/dashboard`);
  }

  approveRequest(scheduleId: number): Observable<any> {
    const url = `https://localhost:44330/api/Admin/approve-schedule-request?scheduleId=${scheduleId}`;
    return this.http.post(url, {});
  }

  deleteRequest(scheduleId: number): Observable<any> {
    const url = `https://localhost:44330/api/Admin/delete-schedule/${scheduleId}`;
    return this.http.delete(url);
  }
}
