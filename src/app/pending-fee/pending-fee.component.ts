import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { PendingFees } from '../models/pendingfees';
@Component({
  selector: 'app-pending-fee',
  templateUrl: './pending-fee.component.html',
  styleUrls: ['./pending-fee.component.scss']
})
export class PendingFeeComponent implements OnInit {
  year : string = "2022-23";
  students : PendingFees[] = [];
  monthFee: Date;

  constructor(private route : Router,
              private studentService : StudentService) { }

  ngOnInit(): void {
//    this._getData()
  }

  _getData() {
    const month = { 
      year: this.year,
      month: this.monthFee
    }
    
    this.studentService.getPendingFee(month).subscribe( response=> {
      this.students = response;
      console.log(this.students);
    })
  }

  monthSelect() {
    console.log("Month Selected "+ this.monthFee)
    this._getData();
  }
  onCancel() {
    this.route.navigateByUrl( '' );
  }

}
