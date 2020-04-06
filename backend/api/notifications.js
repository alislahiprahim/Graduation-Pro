var FCM = require('fcm-notification');
var serverKey = 'AAAAJDHYwJY:APA91bEXPFOwClsZh8ajdvb-s353pzB6U-bPq401cuCbHX2wixkATa1RqcdqJxCYO-'+
'iZUBc3Wff2OxINbq8gRR7W4EVzc_qm-cStmtVVC0XBChuW2JOCaDAQpfFZZekXvmDg2WnFRKxK'
var fcm = new FCM(serverKey);

var message = {
    data: {    //This is only optional, you can send any data
        score: '850',
        time: '2:45'
    },
    notification:{
        title : 'Title of notification',
        body : 'Body of notification'
    },
    token : token
    };

function sender(){
fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});}
module.exports = sender
