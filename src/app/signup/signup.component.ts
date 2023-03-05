import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user:User={
    name:"",
    email:"",
    password:"",

  };
  constructor(private router:Router) { }

  storeUserDetails(){
    if(this.user.name.length!=0 || this.user.email.length!=0 || this.user.password.length!=0){
       localStorage.setItem(this.user.name,JSON.stringify(this.user));
       this.router.navigateByUrl('login');
     }
    else{
       alert("Please Fill the Details");
    }
}
}
