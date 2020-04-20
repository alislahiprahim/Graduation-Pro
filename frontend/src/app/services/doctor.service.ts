import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})


export class doctorService {

    backendApiUrl = 'http://localhost:8085/'

    constructor(public myHttpClient: HttpClient) { }

    signup(data) {

        return this.myHttpClient.post('http://localhost:8085/doctorsignup', data)

    }

    signin(data) {

        return this.myHttpClient.post(this.backendApiUrl + 'doctorsignin', data, { withCredentials: true })

    }

    signout() {
        return this.myHttpClient.get(this.backendApiUrl + 'signout', { withCredentials: true })

    }

    showPatient() {

        return this.myHttpClient.get(this.backendApiUrl + 'showpatient', { withCredentials: true })

    }

    getPatientForm() {

        return this.myHttpClient.get(this.backendApiUrl + 'getpatientform', { withCredentials: true })

    }

    getdoctorData() {
        return this.myHttpClient.get(this.backendApiUrl + 'getdoctorsData', { withCredentials: true })

    }

    getDoctoById(data) {

        return this.myHttpClient.post(this.backendApiUrl + 'getdoctorsById', data, { withCredentials: true })

    }


    sendtreatmentplan(data) {

        return this.myHttpClient.post(this.backendApiUrl + 'sendtreatmentPlan', data, { withCredentials: true })

    }
    sendMessageToPatient(data) {

        return this.myHttpClient.post(this.backendApiUrl + 'sendMessageToPatient', data, { withCredentials: true })

    }

    addQuestions(data) {
        return this.myHttpClient.post(this.backendApiUrl + 'addQuestions', data, { withCredentials: true })
    }

    avtiveToggle(data) {

        return this.myHttpClient.post(this.backendApiUrl + 'OnOffToggle', data, { withCredentials: true })

    }
  
}