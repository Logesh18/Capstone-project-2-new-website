import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data:LoginData={
    name:"",
    password:""
  };
  value:any;
  token='';
  constructor(private router:Router) { }
  login(){
    if(localStorage.getItem(this.data.name)){
        if(JSON.parse(''+localStorage.getItem(this.data.name)).name===this.data.name &&
        JSON.parse(''+localStorage.getItem(this.data.name)).password===this.data.password){
          this.token=this.generateToken();
          sessionStorage.setItem(this.token,JSON.stringify(this.data));
          console.log(JSON.parse(''+sessionStorage.getItem(this.token)));
          this.router.navigateByUrl('home/'+this.token);
          this.token='';
       }
        else{
           alert("Please enter correct login credentials");
        }
    }
    else{
      alert("Please signup");
    }
 }
 localData():any{
     return this.value;
 }
 generateToken():any {
   var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var result = '';
   for ( var i = 0; i < 8; i++ ) {
       result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
   }
   return result;
 }
 signup(){
   this.router.navigateByUrl('signup');
 }
}
