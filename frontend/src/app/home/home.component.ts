import { Component, OnInit } from '@angular/core';
import { doctorService } from '../services/doctor.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public MydoctorService: doctorService) { }

  DData: any
  
  ngOnInit() {
    this.getDoctors()
  }

  getDoctors() {
    this.MydoctorService.getdoctorData().subscribe(((resp: any) => {
      this.DData = resp.data
    }))
  }

}
