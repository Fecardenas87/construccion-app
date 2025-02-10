import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component'
import { HomeComponent } from './app/home/home.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent }
  ];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }