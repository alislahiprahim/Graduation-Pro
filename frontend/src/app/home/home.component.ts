import { Component, OnInit } from '@angular/core';
import { doctorService } from '../services/doctor.service'
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  filteredArray: any[];
  DData: any = []
  searchText: any
  myControl = new FormControl();
  constructor(public MydoctorService: doctorService) { }


  ngOnInit() {
    this.getDoctors()
  }

  getDoctors() {
    this.MydoctorService.getdoctorData().subscribe(((resp: any) => {
      this.DData = resp.data
      this.filteredArray = [...this.DData]
    }))
  }


  handleFilter(event) {
    const value = event.target.value
    this.filteredArray = this.DData.filter((val, ind) =>
      val.username.includes(value))
  }


}
