import { Component, OnInit } from '@angular/core';
import { doctorService } from '../services/doctor.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './Dsignup.component.html',
  styleUrls: ['./Dsignup.component.scss']
})
export class SignupComponent implements OnInit {



  questions = [
    '  Heart_disease',
    'Hepatitis',
    'Diabetes',
    'Blood_pressure',
    'Bleeding_tendency',
    'Allergy',
    'Radiotheraby',
    'Rheumatic',
    'Kindney_diseases',
    'Lactation',
    'Pregnancy',
    'Cosmetics',
    'Ortho',
    'Scalling',
    'RCT',
    'Crown_Bridges',
    'Operative',
    'pediatrics',
    'Check_Up',

  ];

  // public questions: any[] = [{
  //   question: '',
  // }];


  name: any = ''
  username: any = ''
  password: any = ''
  location: any = ''

  constructor(public mydoctorService: doctorService, public myRouter: Router, private myFormBuilder: FormBuilder, private myNgbModal: NgbModal) { }

  ngOnInit() {
  }


  doctorSignUp() {

    const { name, username, location, password } = this

    if (name && password && username && location) {

      this.mydoctorService.signup({ name, username, password, location }).subscribe((resp: any) => {

        if (resp.message == "success") {
          this.myRouter.navigate(['/DsignIn'])
        } else {
          alert('response error')
        }

      })

    }

  }



  // addQST() {
  //   this.questions.push({
  //     question: '',
  //   });
  // }

  // removeQST(i: number) {
  //   this.questions.splice(i, 1);
  // }

  // logValue() {
  //   debugger
  //   console.log(this.questions);
  // }




}