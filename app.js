var builder = require('botbuilder');
var supperbot = new builder.BotConnectorBot({ appId: 'YourAppId', appSecret: 'YourAppSecret' });

supperbot.add('/', function (session) {
    if (!session.userData.menu) {
      session.beginDialog('/menu');
    } else {
      session.send("Hi, tonight you're having %s", session.userData.menu);
    }
});
supperbot.add('/menu', [
  function (session) {
    builder.Prompts.text(session, "What's for dinner tonight?");
  },
  function (session, result) {
    session.userData.menu = result.response;
    session.endDialog();
  }
]);

var restify = require('restify');
var server = restify.createServer();
server.post('/v1/messages', supperbot.verifyBotFramework(), supperbot.listen());
server.listen(8080, function () {
    console.log('%s listening to %s', server.name, server.url); 
});