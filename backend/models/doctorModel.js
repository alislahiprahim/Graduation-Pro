var mongoose = require('mongoose')

let doctorModel = new mongoose.model('Doctor', {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: String,
    password: String,
    location: String,
    email: String,
    avatar: String,
    questions: [],
    P_diagnosis_form: [Object],
    treatmentPlan: [Object],
    activeChecked: Boolean,
    D_Pro_Images: [],
    patient_chat: [Object],
    patientID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }],

})

module.exports = doctorModel 