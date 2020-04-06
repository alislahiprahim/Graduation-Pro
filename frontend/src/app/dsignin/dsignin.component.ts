import { Component, OnInit } from '@angular/core';
import { doctorService } from '../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dsignin',
  templateUrl: './dsignin.component.html',
  styleUrls: ['./dsignin.component.scss']
})
export class DsigninComponent implements OnInit {

  constructor(private MydoctorService: doctorService, private myRouter: Router) { }

  ngOnInit() {
  }

  username: any
  password: any


  onLogin() {
    const { username, password } = this
    this.MydoctorService.signin({ username, password }).subscribe(((resp: any) => {

      if (resp.message == 'success') {
        this.myRouter.navigate(['/dashboard', resp.data._id])
      } else {
        alert('login error')
      }

    }))
  }

}
