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

  constructor(private route : Router,
              private studentService : StudentService) { }

  ngOnInit(): void {
    this._getData()
  }

  _getData() {
    this.studentService.getPendingFee(this.year).subscribe( response=> {
      this.students = response;
      console.log(this.students);
    })
  }

  onCancel() {
    this.route.navigateByUrl( '' );
  }

}
