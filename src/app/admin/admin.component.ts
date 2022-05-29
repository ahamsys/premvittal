import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users : User[] = [];
  loading : boolean = true;
  selectedUser: User;
  viewStudent: boolean = false;

  constructor(private userService : UserService,
    private messageService : MessageService,
    private route: Router,
    private fb: FormBuilder,
    private localstorage : LocalstorageService) { }

  ngOnInit(): void {
    this.loading = false;
    this._getData();
  }

  _getData() {
    this.userService.getAllUsers().subscribe( response=> {
      this.users = response;
      console.log(this.users);
    })
  }

  userClicked(user: User) {
    this.selectedUser=user;
    this.viewStudent = true;
  }

  onCloseViewUser() {
    this.viewStudent=false;
  }
  onCancel() {
    this.route.navigateByUrl('/')
  }

  onApprove(id) {
    const user : User = {
      id : String(id),
      newuser : false
    }

    this.userService.updateNewUserStatus(user).subscribe(
      (response) => {
      this._getData();
      this.addMessage(true, "New User Status Updated!");
 //           alert("new User status updated successfully!");
      },
      (error) => { 
          console.log(error.error)
          this.addMessage(false, error.error);},
      () => console.log('Observer got a complete notification')
    );        
  }

  onDel(id: string) {
    this.userService.deleteUser(id).subscribe( (response)=> {
      this._getData();
      this.addMessage(true, 'User deleted!');
    },
    ()=>{
      this.addMessage(false, 'Unable to Delete User!');
    })
  }

  onExit() {
    this.localstorage.removeToken();
    this.route.navigateByUrl('thankyou');
  }
  addMessage(state: boolean, log : string){
    this.messageService.add({
      severity: state ? 'success' : 'error', 
      summary: state ? 'Success!' : 'error', 
      detail: log})      }
}
