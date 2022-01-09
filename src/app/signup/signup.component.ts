import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:User={
    name:"",
    email:"",
    password:"",

  };
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  storeUserDetails(){
    if(this.user.name.length!=0 || this.user.email.length!=0 || this.user.password.length!=0){
       localStorage.setItem(this.user.name,JSON.stringify(this.user));
       console.log(localStorage.getItem(this.user.name));
       this.router.navigateByUrl('login');
     }
    else{
       alert("Please Fill the Details");
    }
}
}
