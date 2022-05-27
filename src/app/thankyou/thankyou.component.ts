import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {
  buttonText1 : String = "You can Close the Browser Safely"
  buttonText2 : String = "OR click the Sign In"
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    this.route.navigateByUrl('/')
  }
}
