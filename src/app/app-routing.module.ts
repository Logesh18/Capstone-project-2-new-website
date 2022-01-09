import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
   {path:'', redirectTo:'news-site', pathMatch: 'full'},
   {path:'news-site',component:LoadingpageComponent},
   { path:'home/:token', component:HomeComponent},
   { path:'login', component:LoginComponent},
   { path:'signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const route=[LoginComponent,SignupComponent];