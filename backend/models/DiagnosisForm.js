var mongoose = require('mongoose')

let diagnosisForm = new mongoose.model('DiagnosisForm', {
    _id: mongoose.Schema.Types.ObjectId,
    Heart_disease: Boolean,
    Hepatitis: Boolean,
    Diabetes: Boolean,
    Blood_pressure: Boolean,
    Bleeding_tendency: Boolean,
    Allergy: Boolean,
    Radiotheraby: Boolean,
    Rheumatic: Boolean,
    Kindney_diseases: Boolean,
    Lactation: Boolean,
    Pregnancy: Boolean,
    Cosmetics: Boolean,
    Ortho: Boolean,
    Scalling: Boolean,
    RCT: Boolean,
    Crown_Bridges: Boolean,
    Operative: Boolean,
    pediatrics: Boolean,
    Check_Up: Boolean
})

module.exports = diagnosisForm 
