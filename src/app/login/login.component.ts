import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data:LoginData={
    name:"",
    password:""
  };
  value:any;
  token='';
  constructor(private router:Router) { }
  
  getRandomInt(min: number, max: number) {       
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);
    var randomNum: any = '0.' + byteArray[0].toString();
    randomNum = Math.floor(randomNum * (max - min + 1)) + min;
    return randomNum;
  }
  
  login(){
    if(localStorage.getItem(this.data.name)){
        if(JSON.parse(''+localStorage.getItem(this.data.name)).name===this.data.name &&
        JSON.parse(''+localStorage.getItem(this.data.name)).password===this.data.password){
          this.token=this.generateToken();
          sessionStorage.setItem(this.token,JSON.stringify(this.data));
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
       result += randomChars.charAt(this.getRandomInt(0, randomChars.length));
   }
   return result;
 }
 signup(){
   this.router.navigateByUrl('signup');
 }
}
