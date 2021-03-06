import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { patientService } from '../services/patient.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})


export class MessagesComponent implements OnInit {

  inbox = false;
  TP: any
  D_Name: string
  imageURL: string
  show_chat = false
  show = false
  DId: any;
  patient_chat: any = [];


  constructor(private modalService: NgbModal, private mypatientService: patientService) { }

  ngOnInit() {
  }



  gettreatmentPlan() {

    if (!this.TP) {
      this.mypatientService.getTreatmentPlan().subscribe((resp: any) => {
        console.log(resp)
        if (resp == 'authentication failed') {
          window.alert('login please')
          this.show = false
        } else {
          this.show = true
          this.TP = resp
          this.D_Name = this.TP.d_username
          this.imageURL = this.TP.d_avatar
          this.DId = this.TP.result.DId
          this.patient_chat = resp.patient_chat

        }
      })
    }

  }


}