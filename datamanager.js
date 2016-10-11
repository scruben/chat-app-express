'use strict';

const fs = require('fs');
const database = './db/messages.db';

const dm = {};

dm.initDBMessages = function() {
  var data = fs.readFileSync(database, "utf-8");
  var arrMessages = data.split('\n');
  dm.messages = [];
  for (var i=0; i<arrMessages.length; i++) {
    if (arrMessages[i] !== '') dm.messages.push(JSON.parse(arrMessages[i]));
  }
  // Makes weird things, maybe needs to be sorted, same on saveDB
  // dm.messages.sort(function(a,b){
  //   return a.timestamp - b.timestamp;
  // });
}

dm.writeMessage = function(message) {
  var now = Date.now();
  dm.messages.push({content: message.content, timestamp: now});
  return {content: message.content, timestamp: now};
};

dm.loadMessages = function(options) {
  var output = dm.messages.slice(0);
  if (options !== undefined && options.lasttimestamp !== undefined) {
    var indexWhereToCut = -1;
    for (var j = 0; j < dm.messages.length; j++) {
      if (dm.messages[j].timestamp > options.lasttimestamp) {
        indexWhereToCut = j;
        break;
      }
    }

    if (indexWhereToCut !== -1) output = dm.messages.slice(indexWhereToCut);
    else output = [];
  }
  if (options !== undefined && options.limit !== undefined &&
    dm.messages.length > options.limit) {
    output = dm.messages.slice(dm.messages.length-options.limit);
  }
  return output;
}

dm.saveDB = function() {
  // dm.messages.sort(function(a,b){
  //   return a.timestamp - b.timestamp;
  // });
  fs.writeFile(database, '', function(){
    for (var i = 0; i < dm.messages.length; i++) {
      fs.appendFile(database,
        JSON.stringify(dm.messages[i])+'\n'
      );
    }
  });
}

dm.initDBMessages();
setInterval(function () {
  dm.saveDB();
}, 5000);

module.exports = dm;
