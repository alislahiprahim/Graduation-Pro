import { Component, OnInit } from '@angular/core';
import { patientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-psignup',
  templateUrl: './psignup.component.html',
  styleUrls: ['./psignup.component.scss']
})
export class PsignupComponent implements OnInit {

  username: any
  name: any
  password: any

  constructor(private mypatientService: patientService, private myRouter: Router) { }


  ngOnInit() {
  }

  PatientSignUp() {
    const { name, username, password } = this

    if (name && username && password) {

      this.mypatientService.signup({ name, username, password }).subscribe((resp: any) => {
        if (resp.message == 'success') {
          this.myRouter.navigate(['/PsignIn'])

        } else {
          window.alert("error")
        }

      })

    }

  }


}
