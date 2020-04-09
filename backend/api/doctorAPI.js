var mongoose = require('mongoose'),
    doctorModel = require('../models/doctorModel'),
    patientModel = require('../models/patientModel'),
    lo = require('lodash')

function doctorAPI(app) {

    app.post("/doctorsignup", (req, resp) => {

        const { name, username, password, location, email } = req.body
        const d1 = new doctorModel({
            _id: mongoose.Types.ObjectId(),
            name,
            username,
            password,
            location,
            email
        })
        d1.save((err, data) => {
            debugger
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })
        })
    });

    app.post("/doctorsignin", (req, resp) => {

        const { username, password } = req.body
        doctorModel.findOne({ username, password }).exec((err, data) => {
            if (data) {
                req.session.user = data
                resp.json({ message: 'success', data })

            } else {
                resp.json({ message: "error" });
            }

        })

    });



    app.get('/getdoctorsData', (req, resp) => {

        doctorModel.find({}).exec((err, data) => {
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })
        })

    })

    app.post('/getdoctorsById', (req, resp) => {

        const { id } = req.body

        doctorModel.findOne({ _id: id }).exec((err, data) => {
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })
        })

    })


    app.post("/uploadDImage", (req, resp) => {

        const { _id } = req.session.user
        debugger
        const { imageURL } = req.body
        doctorModel.findOne({ _id }).exec((err, DData) => {
            debugger
            DData.avatar = imageURL
            DData.save((err, data) => {
                err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

            })
        })

    });


    app.get('/showpatient', (req, resp) => {
        const { _id } = req.session.user
        doctorModel.findOne({ _id }).populate('patientID').exec((err, data) => {
            patients = data.patientID
            err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', patients })

        })
    })



    app.post("/sendtreatmentPlan", async (req, resp) => {

        const { patientID, to, from, PrimaryCost, planDetails } = req.body
        const { _id } = req.session.user
        debugger

        let doctorData = await doctorModel.findOne({ _id })
        doctorData.treatmentPlan.push({ patientID, to, from, PrimaryCost, planDetails })
        var DD = await doctorData.save()

        let patientData = await patientModel.findOne({ _id: patientID })
        const DId = _id
        patientData.treatmentPlan = { DId, to, from, PrimaryCost, planDetails }
        let PD = await patientData.save()

        resp.json({ result: DD })
    })


    app.post("/sendMessageToPatient", (req, resp) => {

        const { _id, username } = req.session.user
        const { PId, message } = req.body
        patientModel.findOne({ _id: PId }).exec((err, Pdata) => {
            debugger
            Pdata.doctor_chat.push({ _id, message, username })
            Pdata.save((err, data) => {

                err ? resp.json({ message: 'error' }) : resp.json({ message: 'success', data })

            })
        })
    });

    app.post("/addQuestions", async (req, resp) => {

        const { _id } = req.session.user
        const { Questions } = req.body
        let doctorData = await doctorModel.findOne({ _id })
        doctorData.questions = Questions
        let data = await doctorData.save()
        resp.json({ message: 'success', data })
    });


}

module.exports = doctorAPI



