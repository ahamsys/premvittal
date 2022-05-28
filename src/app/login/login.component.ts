import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, SelectMultipleControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
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
  isSignin   : boolean = false;
  buttonText : string = "Register";
  buttonText2: string = "Don't have an account?";
  newuser    : boolean = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private messageService : MessageService,
              private route: Router,
              private localStorage: LocalstorageService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: [ '', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]]
    })
    }

  signIn() {
    this.isSignin = true;
    if ( !this.registeruser){
      this.loginForm.email.setValue("dummy@gmail.com");
      this.loginForm.mobile.setValue('dumy');
    }

      if ( this.form.invalid){
        console.log('Incomplete Data ');
        this.isSignin = false;
        return; 
      }  

  
      const user : User = {
        name : this.loginForm.name.value,
        password : this.loginForm.password.value,
        email : this.loginForm.email.value,
        mobile : this.loginForm.mobile.value,
        newuser : this.registeruser
      }
  
      if ( this.registeruser) {
          this.userService.registerUser(user).subscribe(
            (x:Object) => {
            this.addMessage(true, "New User Registered!");
            alert("Successfully Registered")
            this.route.navigateByUrl('thankyou')},
            (error: HttpErrorResponse) => { 
                this.addMessage(false, 'Unable to Register User!');},
            () => console.log('Observer got a complete notification')
          );        
      }else {
        this.userService.validateUser(user).subscribe((response)=> {
          this.localStorage.setToken(response.key);
          this.routePanel(user);
        },
        (error) => { 
          console.log(error.error.message);
                this.addMessage(false, error.error.message);
        });
      }

      this.isSignin = false;

      if ( this.registeruser )
        this.registeruser =false;
      
      this.setValues()
      this.localStorage.removeToken();
  }

  registerUser() 
  { 
    if ( this.registeruser )
    this.registeruser=false
    else this.registeruser=true; 
    this.setValues() 
  }

  setValues() {
    if (this.registeruser) { 
      this.buttonText = "Sign-In"; this.buttonText2="Already Registered?"  }
    else { 
      this.buttonText = "Register"; this.buttonText2="Don't have an account??"
    }
  }

  changePassword() {
    this.route.navigateByUrl('changepassword');    
  }

  addMessage(state: boolean, log : string){
    this.messageService.add({
      severity: state ? 'success' : 'error', 
      summary: state ? 'Success!' : 'error', 
      detail: log})      }

  routePanel(user) {
    if (user.name==="admin")
      this.route.navigateByUrl('admin');
    else{
      this.route.navigateByUrl('/');     
    }
  }

  get loginForm() {
    return this.form.controls;
  }

}
