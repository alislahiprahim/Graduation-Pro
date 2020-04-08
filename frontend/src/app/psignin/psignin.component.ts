import { Component, OnInit } from '@angular/core';
import { patientService } from '../services/patient.service';
import { Router } from '@angular/router';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-psignin',
  templateUrl: './psignin.component.html',
  styleUrls: ['./psignin.component.css']
})
export class PsigninComponent implements OnInit {

  username: any
  password: any
  user: any;
  loggedIn: boolean;

  constructor(private MypatientService: patientService, private myRouter: Router, private authservice: AuthService, ) { }

  ngOnInit() {
    this.authservice.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  async signInWithGoogle() {

    await this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID)
    this.patientsigninWithGoogle()
  }
  patientsigninWithGoogle() {

    const email = this.user.email
    const username = this.user.firstName + this.user.lastName
    if (this.user) {
      this.MypatientService.patientsigninWithGoogle({ email, username }).subscribe((resp: any) => {
        this.myRouter.navigate(['/home', resp.data._id])
      })
    }

  }




  onLogin() {
    const { username, password } = this
    this.MypatientService.signin({ username, password }).subscribe(((resp: any) => {

      if (resp.message == 'success') {
        this.myRouter.navigate(['/home', resp.data._id])
      } else {
        alert('login error')
      }

    }))
  }




}
