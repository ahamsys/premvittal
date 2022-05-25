import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import { User } from '../models/user';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  rememberme1: boolean = false;
  registeruser : boolean = false;
  form       : FormGroup;
  constructor(private fb: FormBuilder,
              private studentService: StudentService,
              private messageService : MessageService,
              private route: Router,
              private localStorage: LocalstorageService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: [ '', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]]
    })
    }

  signIn() {

    if ( !this.registeruser){
      this.loginForm.email.setValue("dummy");
      this.loginForm.mobile.setValue('dumy');
    }

      if ( this.form.invalid){
        console.log('Incomplete Data ');
        return; 
      }  

      const user : User = {
        name : this.loginForm.name.value,
        password : this.loginForm.password.value,
        email : this.loginForm.email.value,
        mobile : this.loginForm.mobile.value
      }
  
      if ( this.registeruser) {
          this.studentService.registerUser(user).subscribe(
            (x:Object) => {
            this.addMessage(true, "New User Registered!");},
            (error: HttpErrorResponse) => { 
                this.addMessage(false, 'Unable to Register User!');},
            () => console.log('Observer got a complete notification')
          );        
      }else {
        this.studentService.validateUser(user).subscribe((response)=> {
          console.log(response);
          this.localStorage.setToken(response.key);
          this.route.navigateByUrl('/');    
        },
        (error) => { 
          console.log(error.error.message);
                this.addMessage(false, error.error.message);
        });
      }
    


      if ( this.registeruser )
        this.registeruser =false;
  }

  registerUser() {
    console.log("Register User is true")
    this.registeruser = true;
  }


  addMessage(state: boolean, log : string){
    this.messageService.add({
      severity: state ? 'success' : 'error', 
      summary: state ? 'Success!' : 'error', 
      detail: log})      }

 

  get loginForm() {
    return this.form.controls;
  }

}
