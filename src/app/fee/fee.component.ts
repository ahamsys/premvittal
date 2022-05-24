import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { Fees } from '../models/fees';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {
  id : String;
  form : FormGroup;
  name : String;
  fees : Fees[] = [];

  constructor(private activatedRoute : ActivatedRoute,
              private route: Router,
              private fb: FormBuilder,
              private studentService  : StudentService,
              private messageService : MessageService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.name = this.activatedRoute.snapshot.paramMap.get('name');
    this._getData();
    this.form = this.fb.group({
      datepaid: ['', [Validators.required]],
      amount: ['',[Validators.required]],
      feemonth: ['', [Validators.required]],
      notes: ['']
  })
    this.feeForm.datepaid.setValue(new Date());
  }

  _getData() {
    this.studentService.getFeesByStudent(this.id).subscribe( response=> {
      this.fees = response;
    })
  }

  onCancel() {
    this.route.navigateByUrl( '' );
  }

  onFeePaid() {
    
    var tmp = new Date(this.feeForm.feemonth.value);
    var mon = String( tmp.toLocaleString('default', { month: 'short'})+String(tmp.getFullYear()) );

    console.log('['+ mon+ ']');

    const fee : Fees = {
      year : "2022-23",
      feemonth : mon,
      amount : this.feeForm.amount.value,
      studentID: String(this.id),
      notes: this.feeForm.notes.value,
      datepaid : this.feeForm.datepaid.value
    }

    this.studentService.addNewFee(fee).subscribe(      
      (x :Fees) => {    
          this._getData();
          this.addMessage(true, "Fee added!");
        console.log('Fee added to Db: [' + x.amount+"]")},
      err => { console.error('Got an error: ' + err);
      this.addMessage(false, 'Unable to Add Fee!');
      },
      () => console.log('Observer got a complete notification')
    );        

  }

  onFeeCancel() {
    this.route.navigateByUrl( '' );
  }

  addMessage(state: boolean, log : string){
    this.messageService.add({
      severity: state ? 'success' : 'error', 
      summary: state ? 'Success!' : 'error', 
      detail: log})      }

  get feeForm() {
    return this.form.controls;
  }
    
}
