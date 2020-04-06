var mongoose = require('mongoose')

let patientModel = new mongoose.model('Patient', {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: { type: String, unique: true },
    password: String,
    avatar: String,
    email: String,
    medical_month: Object,
    to_date: Object,
    from_date: Object,
    ariv_date: Object,
    depat_date: Object,
    accept_flag: Boolean,
    treatmentPlan: Object,
    diagnosis_form: [Object],
    doctor_chat: [Object],
    doctorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    DiagnosisFormID: { type: mongoose.Schema.Types.ObjectId, ref: 'DiagnosisForm' },

})

module.exports = patientModel


