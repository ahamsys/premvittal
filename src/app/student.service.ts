import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './models/student';
import { Fees } from './models/fees';
import { PendingFees } from './models/pendingfees';
import { Remarks } from './models/remarks';
import { User } from './models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  apiURL = environment.apiURL ;
  apiFeeURL = environment.apiFeeURL;
  apiRemarksURL = environment.apiRemarksURL;
  apiUserURL = environment.apiUserURL;

  constructor(private http: HttpClient) { }

  //Fetch details based on year:

  getStudentsByYear(year: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiURL}/get/${year}`);
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.apiURL}/${id}`);
  }

  //Insert new record for student
  addNewStudent(student : Student) {
    return this.http.post(`${this.apiURL}/add`, student);
  }

  addNewFee(fee: Fees) {
    return this.http.post(`${this.apiFeeURL}/add`, fee);
  }

  //Update details by ID
  updateStudent(id: string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiURL}/${id}`, student);
  }
  
  getFeesByStudent(studentid: String): Observable<Fees[]> {
    return this.http.get<Fees[]>(`${this.apiFeeURL}/${studentid}`);
  }

  getPendingFee(year: String): Observable<PendingFees[]> {
    return this.http.get<PendingFees[]>(`${this.apiFeeURL}/pending/${year}`);
  }

    //Insert new record for student
  addNewRemark(remark : Remarks) {
    return this.http.post(`${this.apiRemarksURL}/add`, remark);
  }
  
  getRemarks(studentID : String): Observable<Remarks[]> {
    return this.http.get<Remarks[]>(`${this.apiRemarksURL}/${studentID}`);
  }

}
