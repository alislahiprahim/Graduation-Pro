import { Component, OnInit, Input } from '@angular/core';
import { patientService } from '../services/patient.service';
import { doctorService } from '../services/doctor.service';
import * as _ from 'lodash'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  imageURL: string
  @Input() DId: any;
  @Input() PId: any;
  @Input() patient_chat: any;
  @Input() d_chat: any;
  message: string




  constructor(private mypatientService: patientService, private mydoctorService: doctorService) { }

  ngOnInit() {
  }


  sendMessageToDoctor() {
    const { message, DId } = this
    this.mypatientService.sendMessageToDoctor({ message, DId }).subscribe((resp) => {
      console.log('send')
    })
  }

  sendMessageToPatient() {
    const { message, PId } = this
    this.mydoctorService.sendMessageToPatient({ message, PId }).subscribe((resp: any) => {
      console.log('send')

    })

  }


}
