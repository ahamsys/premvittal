import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getAgeForStudent(dob: String): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/age/${dob}`);
  }

  getPendingFee(data: any): Observable<PendingFees[]> {
    let queryParams = new HttpParams();
    const month = (data.month.getMonth()+1)+'-'+data.month.getDate()+'-'+data.month.getFullYear();

    console.log("Year=> ["+data.year+"]")
    queryParams = queryParams.append("year", data.year)
    queryParams = queryParams.append("month", month)

    console.log("Query params: "+queryParams);
//    return this.http.get<PendingFees[]>(`${this.apiFeeURL}/pending/${data.year}`);//Working
    return this.http.get<PendingFees[]>(`${this.apiFeeURL}/pending/${data.year}`, 
                                        {params:queryParams});
  }

    //Insert new record for student
  addNewRemark(remark : Remarks) {
    return this.http.post(`${this.apiRemarksURL}/add`, remark);
  }
  
  getRemarks(studentID : String): Observable<Remarks[]> {
    return this.http.get<Remarks[]>(`${this.apiRemarksURL}/${studentID}`);
  }

}
