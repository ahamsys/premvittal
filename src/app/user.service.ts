import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.apiURL ;
  apiUserURL = environment.apiUserURL;
  apiPasswordURL = environment.apiPasswordURL;

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUserURL}/register`, user);
  }

  validateUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUserURL}/login`, user);
  }

  sendOTP(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiPasswordURL}/sendotp`, user);
  }

  updatePassword(user: User): Observable<any> {
    console.log("ID received "+user.id)
    return this.http.put<any>(`${this.apiPasswordURL}/${user.id}`, user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUserURL}`);
  }

  updateNewUserStatus(user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUserURL}/approveuser/${user.id}`, user);
  }


 //Delete a record 
 deleteUser(userId: string): Observable<Object> {
  return this.http.delete<Object>(`${this.apiUserURL}/${userId}`);
}

}
