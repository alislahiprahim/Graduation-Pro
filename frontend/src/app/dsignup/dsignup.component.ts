import { Component, OnInit } from '@angular/core';
import { doctorService } from '../services/doctor.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
@Component({
  selector: 'app-signup',
  templateUrl: './Dsignup.component.html',
  styleUrls: ['./Dsignup.component.scss']
})
export class SignupComponent implements OnInit {





  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
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

  constructor(public mydoctorService: doctorService, public myRouter: Router, private myFormBuilder: FormBuilder, ) { }

  ngOnInit() {
  }


  doctorSignUp() {

    const { name, username, location, password, questions } = this
    
    if (name && password && username && questions && location) {

      this.mydoctorService.signup({ name, username, password, questions, location }).subscribe((resp: any) => {

        if (resp.message == "success") {
          this.myRouter.navigate(['/'])
        } else {
          alert('response error')
        }

      })

    }

  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;


    // Add our fruit
    if ((value || '').trim()) {
      this.questions.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(q): void {
    const index = this.questions.indexOf(q);
    if (index >= 0) {
      this.questions.splice(index, 1);
    }
  }

  show() {
    console.log(this.questions)
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