import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { doctorService } from '../services/doctor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-questions',
  templateUrl: './doc-questions.component.html',
  styleUrls: ['./doc-questions.component.css']
})
export class DocQuestionsComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  dynamicForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private mydoctorService: doctorService, private myRouter: Router) { }

  ngOnInit() {

    this.dynamicForm = this.formBuilder.group({
      numberOfQuestions: ['', Validators.required],
      Questions: new FormArray([])
    });

  }
  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get q() { return this.f.Questions as FormArray; }

  onChangeQuestions(e) {
    const numberOfQuestions = e.target.value || 0;
    if (this.q.length < numberOfQuestions) {
      for (let i = this.q.length; i < numberOfQuestions; i++) {
        this.q.push(this.formBuilder.group({
          question: ['', Validators.required],
          type: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.q.length; i >= numberOfQuestions; i--) {
        this.q.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    const { Questions } = this.dynamicForm.value
    this.mydoctorService.addQuestions({ Questions }).subscribe((resp: any) => {
      this.myRouter.navigate(['/dashboard', resp.data._id])
    })
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.q.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.q.reset();
  }



  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;


  //   // Add our fruit
  //   if ((value || '').trim()) {
  //     this.questions.push(value.trim());
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  // remove(q): void {
  //   const index = this.questions.indexOf(q);
  //   if (index >= 0) {
  //     this.questions.splice(index, 1);
  //   }
  // }


}
