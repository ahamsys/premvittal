import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent implements OnInit {

  constructor(private route : Router, 
              private location: Location) { }

  ngOnInit(): void {
  }

  onHome() {
    this.route.navigateByUrl('')
  }

  onCancel() {
    this.location.back();
  }

}
