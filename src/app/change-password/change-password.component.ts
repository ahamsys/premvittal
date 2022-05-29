import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from "../models/user";
import { UserService } from '../user.service';
import { MessageService } from 'primeng/api';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form       : FormGroup;
  form2      : FormGroup;
  isSubmitted: boolean = false;
  isSubmitted2: boolean = false;
  isWrongOTP : boolean = false;
  isValidOTP : boolean =false;
  userid     : String;
  otp        : String;
  resetPassword : boolean=false;
  value3 : String;  
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private messageService : MessageService,
    private route: Router,
    private localStorage: LocalstorageService) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      name: [ '', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      mobile: ['', [Validators.required]]
    })

    this.form2 = this.fb.group({
      otp: ['', [Validators.required]],
      password1: [ '', [Validators.required]],
      password2: [ '', [Validators.required]],
    })
  }

  submit() {
    this.isSubmitted=true;

    if (this.form.invalid) { 
      console.log("Invalid Form data"); return; }

    const user : User = {
      name : this.inputForm.name.value,
      email : this.inputForm.email.value,
      mobile : this.inputForm.mobile.value
    }

    this.userService.sendOTP(user).subscribe(
      (response) => {
      this.addMessage(true, "OTP Sent, Check your registered Email!");
//      alert("OTP Sent, Check your registered Email!");
      this.storeToken(response)
      this.resetPassword=true;
      this.passwordForm.otp.setValue(this.otp)

   //      this.route.navigateByUrl('thankyou')
      },
      (error) => { 
          console.log(error.error)
          this.addMessage(false, error.error);},
      () => console.log('Observer got a complete notification')
    );        

  }


  submitPassword() {
    this.isSubmitted2=true;

    if (this.form2.invalid) { 
      console.log("Invalid Form data"); return; }

    const user : User = {
      id : String(this.userid),
      password : this.passwordForm.password1.value
    }

    this.userService.updatePassword(user).subscribe(
      (response) => {
      this.addMessage(true, "Password Updated!");
      alert("Password updated successfully!");
      this.resetPassword=true;
      this.route.navigateByUrl('thankyou')
      },
      (error) => { 
          console.log(error.error)
          this.addMessage(false, error.error);},
      () => console.log('Observer got a complete notification')
    );        

  }


  storeToken(response) {
      if ( response.token ) {
        console.log("token OBJECT: ")

        console.log(JSON.parse(atob(response.token.split('.')[1])))
        this.otp = (JSON.parse(atob(response.token.split('.')[1]))).otp;
        this.userid = (JSON.parse(atob(response.token.split('.')[1]))).userId;
        this.localStorage.setToken(response.token);

        console.log("OTP : "+this.otp+","+this.userid)
    }  
  }

  addMessage(state: boolean, log : string){
    this.messageService.add({
      severity: state ? 'success' : 'error', 
      summary: state ? 'Success!' : 'error', 
      detail: log})      }


  validateOTP() {
    const otp = Number(this.passwordForm.otp.value)
    const token = Number(this.otp)
    
    if ( otp == token) {
      this.isValidOTP = true;
    }
}

  onExit() {
        this.route.navigateByUrl('thankyou')
  }

  get inputForm() {
    return this.form.controls;
  }

  get passwordForm() {
    return this.form2.controls;
  }

}
