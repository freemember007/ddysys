var http = require('http');
var apn = require('apn');
var url = require('url');

var deviceToken = '632078e7705af5d585ee3c0ccda56069c544cd2107ec7308ccb79bda233f5849';
var myDevice = new apn.Device(deviceToken);

var note = new apn.Notification();
note.badge = 1;
note.contentAvailable = 1;

note.sound = 'beep.wav';

note.alert = 'PushIt works:\n Congratulations! \u270C\u2764\u263A ';

note.payload = {
  'messageFrom': 'PushIt'
};

note.device = myDevice;

var callback = function(errorNum, notification) {
  console.log('Error is: %s', errorNum);
  console.log('Note ' + JSON.stringify(notification));
}
var options = {
  gateway: 'gateway.sandbox.push.apple.com',
  errorCallback: callback,
  cert: 'ddysysCert.pem',
  key: 'ddysysKey.pem',
  passphrase: '123456',
  port: 2195,
  enhanced: true,
  cacheLength: 100
}
var apnsConnection = new apn.Connection(options);
console.log('Note ' + JSON.stringify(note));
apnsConnection.sendNotification(note);