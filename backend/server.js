var express = require('express')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var cors = require('cors')
var uuid = require('uuid/v4')
var doctorApi = require('./api/doctorAPI')
var patientApi = require('./api/patientAPI')
var DBconnection = require('./DBconnction')
var app = express()












function authenticate(req, resp, next) {

    if (req.url === '/doctorsignup' || req.url === '/doctorsignin' || req.url === '/patientsignup' || req.url === '/patientsignin' || req.url === '/patientsigninWithGoogle') {

        next()
    } else {

        if (req.session.user && req.cookies["connect.sid"]) {
            next()
        } else {
            resp.json('authentication failed')
        }


    }

}


app.use(express.json())
app.use(session({
    genid: uuid,
    secret: 'mysecret'
}))
app.use(cookieParser());
app.use(
    cors({
        origin: ' http://localhost:4200',
        credentials: true,
        maxAge: 1000000
    })

)
app.use(authenticate)

DBconnection()

doctorApi(app)
patientApi(app)


app.listen(8085);
