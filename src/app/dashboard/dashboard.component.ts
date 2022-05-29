import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import { Fees } from '../models/fees';
import { StudentService } from '../student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  year : string = "2022-23";
  students : Student[] = [];
  viewStudent : Student;
  loading : boolean = true;
  selectedStudent: Student[];
  isNewStudent: boolean = false;
  isViewStudent: boolean = false;
  isDashboard: boolean = true;
  isFees: boolean = false;
  isStudentSaved: boolean = false;
  form       : FormGroup;
  form2      : FormGroup;
  
  constructor(private studentService : StudentService,
              private messageService : MessageService,
              private localStorage   : LocalstorageService,
              private route: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this._getData();
    this.loading = false;

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      father: ['', [Validators.required]],
      mobile1: ['', [Validators.required]],
      job1: [''],
      address1: [''],
      mother: ['',[Validators.required]],
      mobile2: [''],
      job2: [''],
      address2: [''],
      language: ['']
    })    

    this.form2 = this.fb.group({
      feedate: ['', [Validators.required]],
      amt: ['',[Validators.required]],
      feemonth: ['', [Validators.required]]
  })
}

  _getData() {
    this.studentService.getStudentsByYear(this.year).subscribe( response=> {
      this.students = response;
      console.log(this.students);
    })
  }

  onAdd()
  {
    this.isNewStudent=true;
    this.isDashboard=false;
  }

  onPending() {
    this.route.navigate(['pendingfee'] );
  }

  onCancel()
  {
    this.isNewStudent=false;
    this.isDashboard=true;
  }

  onSave()
  {
    this.isStudentSaved = true;
    if ( this.form.invalid){
      console.log('Incomplete Data ');
      return; 
    }  
    this.isNewStudent=false;
    this.isDashboard=true;

    const student : Student = {
      year : "2022-23",
      name : this.studentForm.name.value,
      dob  : this.studentForm.dob.value,
      father : this.studentForm.father.value,
      job1 : this.studentForm.job1.value,
      mobile1 : this.studentForm.mobile1.value,
      mother : this.studentForm.mother.value,
      job2 : this.studentForm.job2.value,
      mobile2 : this.studentForm.mobile2.value,
      address1 : this.studentForm.address1.value,
      address2 : this.studentForm.address2.value,
      language : this.studentForm.language.value
    }

    this.studentService.addNewStudent(student).subscribe(
      
      (x :Student) => {    
        this._getData();
        this.addMessage(true, "Student added!");
        console.log('Student added to Db: [' + x.name+"]")},
      err => { console.error('Got an error: ' + err);
         this.addMessage(false, 'Unable to Add Student!');
      },
      () => console.log('Observer got a complete notification')
    );        

    this.isStudentSaved = false;

  }

  onCloseView() {
    this.isViewStudent = false;
    this.isDashboard = true;
    this.isNewStudent = false;
    this.isFees = false;
  }

  onFees(student: Student)
  {
//    this.isViewStudent = false;
//    this.isDashboard = false;
 //   this.isNewStudent = false;
//    this.isFees = true;
    this.viewStudent = student;
    this.route.navigate(['fee', 
                          { id: this.viewStudent.id,
                            name: this.viewStudent.name}
                          ] );
  }

  studentClicked(student:Student) {
//      this.isViewStudent = true;
 //     this.isDashboard = false;
  //    this.isNewStudent = false;
   //   this.isFees = false;
      this.viewStudent = student;
      this.route.navigate(['editstudent', { id: this.viewStudent.id}] );
    }



  onEditStudent() {
    
    this.route.navigate(['editstudent', { id: this.viewStudent.id}] );
//    this.route.navigateByUrl( 'editstudent' );
  }

  onExit() {
    this.localStorage.removeToken();
    this.route.navigateByUrl('thankyou');
  }


  get studentForm() {
    return this.form.controls;
  }

  get feeForm() {
    return this.form2.controls;
  }

  addMessage(state: boolean, log : string){
    this.messageService.add({
      severity: state ? 'success' : 'error', 
      summary: state ? 'Success!' : 'error', 
      detail: log})      }

}
