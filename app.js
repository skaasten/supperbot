var builder = require('botbuilder');
var supperbot = new builder.TextBot();

supperbot.add('/', function (session) {
    session.send('Hello World');
});

supperbot.listenStdin();