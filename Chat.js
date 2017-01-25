var redis = require("redis");
var prompt = require('prompt');

var sub = redis.createClient(), pub = redis.createClient();

var messageSent, pseudo;

prompt.start();

function pseudoPrompt() {

    prompt.get(['pseudo'], function (err, result) {
        if (err) { return onErr(err); }
        pseudo = result.pseudo;
        getMessage();
    });
}

function getMessage() {
    prompt.get(['messages'], function (err, result) {
        if (err) { return onErr(err); }
        messageSent = result.messages;
        pub.publish("Chat Channel", pseudo+" : "+messageSent);
        getMessage();
    });
}

/*sub.on("subscribe", function (channel, count) {
    pub.publish("Chat Channel", "Message : "+messageSent);
});*/

sub.on("message", function (channel, message) {
    console.log(message);
});

sub.subscribe("Chat Channel");
pseudoPrompt();
