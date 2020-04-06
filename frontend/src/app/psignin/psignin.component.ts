import { Component, OnInit } from '@angular/core';
import { patientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-psignin',
  templateUrl: './psignin.component.html',
  styleUrls: ['./psignin.component.css']
})
export class PsigninComponent implements OnInit {

  username: any
  password: any

  constructor(private MypatientService: patientService, private myRouter: Router, ) { }

  ngOnInit() {
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
