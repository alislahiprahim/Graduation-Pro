import { Component, OnInit } from '@angular/core';
import { doctorService } from '../services/doctor.service';
import { patientService } from '../services/patient.service';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  images;
  username: any
  password: any
  imageprofile: any
  loggedIn: boolean;

  constructor(private mydoctorService: doctorService, private myRouter: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.loggedIn = (user != null);
    });

  }


  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }




  signOut(): void {
    if (this.loggedIn) {
      this.authService.signOut();
      location.reload()

    }
    this.mydoctorService.signout().subscribe((resp: any) => {

      location.reload()
      
    })

  }



}