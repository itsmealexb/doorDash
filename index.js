var dash_button = require('node-dash-button'),
slackWrapi = require('slack-wrapi');

var dash = dash_button("74:c2:46:4a:8d:f2", null, null, "all"),
//var dash = dash_button("f0:27:2d:64:df:ef", null, null, "all"),
client = new slackWrapi("xoxp-245119567318-243714151121-244166330051-b4502faf713865a2c8fcc38163b70a1c"),
target = "#java-hut",
//message = "Coffee train leaving in 5";
message = "/giphy test";
console.log("Started...");


var userLookup = (chatID) => {
  return new Promise((resolve, reject) => {
    client.users.info({user: chatID}, function(err, data) {
      if (!err) {
        console.log(data.user.real_name);
        console.log(data.user.id);
        resolve(data.user);
      }
    });
  });
}

var groupMessenger = () => {
  return new Promise((resolve, reject) => {
    console.log("Messaging...");
    client.chat.postMessage({
        "channel": target,
        "text": message
      },
      function(err, data) {
        if (!err) {
          resolve(console.log("Posted"));
        }
        else{
          reject(err);
        }
      }
    );
  });
}


var messenger = (userData) => {
  return new Promise((resolve, reject) => {
    console.log("Messaging...");
    console.log("Channel: " + userData.id);
    client.chat.postMessage({
        "channel": userData.id,
        "text": message,
        "as_user": true
      },
      function(err, data) {
        if (!err) {
          //console.log(data);
          console.log(userData);

          resolve();
        }
        else{
          reject(err);
        }
      }
    );
  });
}

var pickUser = (data) => {
  console.log("Picking User");
  return new Promise( (resolve, reject) => {
    for (let i = 0; i < data.ims.length; i++) {
      userLookup(data.ims[i].user).then( (data) => {
        console.log("User Check: " + data.real_name);
        if(data.real_name === target){
          console.log("compare");
            resolve(data);
        }
      });
    }
  });
}

var channelList = () => {
  console.log("Searching Channels...");
  return new Promise((resolve, reject) => {
    client.im.list({exclude_archived:1}, function(err, data) {
      if (!err) {
        resolve(data);
      }
      else{
        reject(err);
      }
    });
  });
}


//button found
//dash.on("detected", () => {
  console.log("Detected...");
  /*if(target.substring(0,1) != "#"){
    channelList().then(pickUser)
    .then(messenger)
    .catch(function (error){
      console.log("Error: " + error.message);
    });
  }
  else{*/
    groupMessenger().then(console.log("Test"));
  //}
//});
