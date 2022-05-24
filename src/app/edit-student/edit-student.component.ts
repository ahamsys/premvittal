import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../models/student';
import { Remarks } from '../models/remarks';
import { StudentService } from '../student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  id : string;
  viewStudent : Student;
  form       : FormGroup;
  form2      : FormGroup;
  isStudentSaved : boolean = false;
  isViewStudent : boolean = true;
  isEditStudent : boolean = false;
  isRemarkStudent  : boolean = false;
  isRemarkSaved : boolean = false;
  remarks : Remarks[] = [];

  constructor(private activatedRoute : ActivatedRoute,
              private studentService : StudentService,
              private route: Router,
              private fb: FormBuilder,
              private messageService : MessageService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this._getStudent();
    this._getRemarks();

    this.form = this.fb.group({
      name: [ '', [Validators.required]],
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
      remark: ['', [Validators.required]],
      date: [ '', [Validators.required]],
   })

   this.remarkForm.date.setValue(new Date());
  }

  _getRemarks() {
    this.studentService.getRemarks(this.id).subscribe( response=> {
      this.remarks = response;
    })
  }

  _getStudent() {
    this.studentService.getStudentById(this.id).subscribe( response=> {
      this.viewStudent = response;
      this.studentForm.name.setValue( response.name );
      this.studentForm.language.setValue( response.language );
      this.studentForm.father.setValue( response.father );
      this.studentForm.job1.setValue( response.job1 );
      this.studentForm.mobile1.setValue( response.mobile1 );
      this.studentForm.mother.setValue( response.mother );
      this.studentForm.job2.setValue( response.job2 );
      this.studentForm.mobile2.setValue( response.mobile2 );
      this.studentForm.address1.setValue( response.address1 );
      this.studentForm.address2.setValue( response.address2 );
      let ti:Date = new Date(response.dob);
      this.studentForm.dob.setValue( ti );
    })
  }

  onSave() {
    this.isStudentSaved = true;
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

    this.studentService.updateStudent(this.viewStudent.id, student).subscribe(
      (x :Student) => {    
        this._getStudent();
        this.addMessage(true, "Student Updated!");},
      err => { console.error('Got an error: ' + err);
      this.addMessage(false, 'Unable to Update Student!');},
      () => console.log('Observer got a complete notification')
    );        
    this.isEditStudent =false;
    this.isViewStudent =true;
    this.isStudentSaved=false;
  }

  onHome() {
    this.route.navigateByUrl( '' );
  }

  onReportCard() {
    this.route.navigateByUrl( 'reportcard' );
  }
  
  onModifyCancel() {
    if ( this.isEditStudent || this.isRemarkStudent ){
      this.isEditStudent = false;
      this.isViewStudent = true;
      this.isRemarkStudent = false;
    }
    else
      this.onHome()
  }

  onEditStudent() {
    this.isEditStudent =true;
    this.isViewStudent =false;
  }

  onRemark() {
    this.isEditStudent =false;
    this.isViewStudent =false;
    this.isRemarkStudent = true;
  }

  onRemarkSave() {
    this.isRemarkSaved = true;
    if ( this.form2.invalid){
      console.log('Incomplete Data ');
      return; 
    }  
    const remark : Remarks = {
      studentID : this.viewStudent.id,
      date : this.remarkForm.date.value,
      remark  : this.remarkForm.remark.value
    }

    this.studentService.addNewRemark(remark).subscribe(
      (x :Remarks) => {    
        this._getRemarks();
        this.addMessage(true, "Remark Updated!");},
      err => { console.error('Got an error: ' + err);
      this.addMessage(false, 'Unable to Update Remark!');},
      () => console.log('Observer got a complete notification')
    );        
    this.isRemarkStudent =false;
    this.isRemarkSaved = false;     
    this.isViewStudent = true;
  }

  addMessage(state: boolean, log : string){
    this.messageService.add({
      severity: state ? 'success' : 'error', 
      summary: state ? 'Success!' : 'error', 
      detail: log})      }

    get studentForm() {
      return this.form.controls;
    }

    get remarkForm() {
      return this.form2.controls;
    }
    
}


