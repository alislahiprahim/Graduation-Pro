var mongoose = require('mongoose'),
    patientModel = require('../models/patientModel'),
    doctorModel = require('../models/doctorModel'),
    lo = require('lodash')



////var TEST NOTIFICATIONS 

/////////////
function patientAPI(app) {

    app.post("/patientsignup", (req, resp) => {

        const { name, username, password, email } = req.body

        let p1 = new patientModel({
            _id: mongoose.Types.ObjectId(),
            name,
            username,
            password,
            email

        })

        p1.save((err, data) => {

            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

        })

    });

    app.post("/patientsignin", (req, resp) => {

        const { username, password } = req.body

        patientModel.findOne({ username, password }).exec((err, data) => {
            if (data) {
                req.session.user = data
                resp.json({ message: 'success', data })

            } else {
                resp.json({ message: "error" });
            }

        })

    });

    app.post("/patientsigninWithGoogle", (req, resp) => {
        const { username, email } = req.body
        patientModel.findOne({ email: email }).exec((err, data) => {
            if (data) {
                debugger
                req.session.user = data
                resp.json({ message: 'loggedin', data })
            } else {
                let p1 = new patientModel({

                    _id: mongoose.Types.ObjectId(),
                    username,
                    email
                })
                p1.save((err, data) => {
                    debugger
                    err ? resp.json({ message: 'error', err }) : resp.json({ message: 'success', data })

                })
            }

        })
    });

    app.get('/signout', async (req, resp) => {

        await req.session.destroy()
        resp.json({ message: "success" })

    });


    app.get('/showdoctor', (req, resp) => {
        const { _id } = req.session.user
        patientModel.findOne({ _id }).exec((err, data) => {
            doctor = data.doctorID

            //notification api Testing////////////

            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', response })


        })
    })



    app.post("/uploadPImage", (req, resp) => {

        const { _id, avatar } = req.session.user
        patientModel.findOne({ _id }).exec((err, PData) => {
            PData.avatar = avatar
            PData.save((err, data) => {
                err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

            })
        })

    });

    app.get('/getpatientProfile', (req, resp) => {
        data = req.session.user
        resp.json({ message: 'success', data })
    })


    app.post("/fillDiagnosisForm", async (req, resp) => {
        const { _id } = req.session.user
        const { diagnosis_form, DId } = req.body

        let patientData = await patientModel.findOne({ _id })
        patientData.diagnosis_form.push({ diagnosis_form, DId })
        patientData.doctorID = DId
        let PD = await patientData.save()

        let doctorData = await doctorModel.findOne({ _id: DId })
        findID = lo.find(doctorData.patientID, (o) => { return o._id == _id })
        if (findID) {
            resp.json({ message: "found" })
        } else {
            doctorData.patientID.push(_id)
            let output = await doctorData.save()
            resp.json({ result: output })
        }

    });



    app.post("/patientMedicalMonth", async (req, resp) => {

        const { _id } = req.session.user
        const { medical_month } = req.body

        let patientData = await patientModel.findOne({ _id })
        patientData.medical_month = medical_month
        let data = await patientData.save()
        resp.json({ result: data })
    });


    app.post("/patientArrivalDate", async (req, resp) => {

        const { _id } = req.session.user
        const { to_date, from_date } = req.body

        let patientData = await patientModel.findOne({ _id })
        patientData.to_date = to_date
        patientData.from_date = from_date
        let data = await patientData.save()
        resp.json({ result: data })
    });


    app.get("/getTreatmentPlan", async (req, resp) => {

        const { treatmentPlan, patient_chat } = req.session.user

        if (treatmentPlan) {
            let DId = treatmentPlan.DId
            let doctorData = await doctorModel.findOne({ _id: DId })
            let d_username = doctorData.username
            let d_avatar = doctorData.avatar
            resp.json({ result: treatmentPlan, d_username, d_avatar, patient_chat })
        } else {
            resp.json({ result: "no treatment plan added" })
        }
    });

    app.post("/sendMessageToDoctor", (req, resp) => {

        const { _id, username } = req.session.user
        const { DId, message } = req.body
        doctorModel.findOne({ _id: DId }).exec((err, Ddata) => {
            Ddata.patient_chat.push({ _id, message, username })
            Ddata.save((err, data) => {
                err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

            })
        })
    });


    app.post("/patientAcceptance", async (req, resp) => {

        const { _id } = req.session.user
        const { accept_flag } = req.body
        let patientData = await patientModel.findOne({ _id })

        if (accept_flag == 'true') {
            patientData.accept_flag = true
            var PD = await patientData.save()
        }
        else {

            let doctorData = await doctorModel.findOne({ _id: patientData.doctorID })
            doctorData.patientID = doctorData.patientID.filter(p => {
                return p._id != _id
            })
            doctorData.patient_chat = null
            var DD = await doctorData.save()
            let TP = this.treatmentPlan.findOneAndDelete({ patientID: _id })
            TP.save()
            patientData.doctorID = null
            patientData.doctor_chat = null
            patientData.accept_flag = null
            PD = await patientData.save()
        }
        resp.json({ result: PD })
    });


}



module.exports = patientAPI



