var builder = require('botbuilder');
var supperbot = new builder.BotConnectorBot({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET });
var moment = require('moment');

supperbot.add('/', function (session) {
    if (!session.userData.schedule) {
      session.beginDialog('/menu');
    } else {
      if ((session.message.text.indexOf('no') !== -1) ||
          (session.message.text.indexOf('No') !== -1)) {
        session.userData.menu = null;
        session.send("Okay, we can have something else - what do you want?");
        session.beginDialog('/menu');
      } else {
        session.send("Hi, tonight you're having %s.\n" +
                     "We need to %s %s from now.",
                     session.userData.menu,
                     session.userData.preparation,
                     moment(session.userData.schedule).fromNow()
                    );

      }
    }
});
supperbot.add('/menu', [
  function (session) {
    builder.Prompts.text(session, "What's for dinner tonight?");
  },
  function (session, result) {
    session.userData.menu = result.response;
    builder.Prompts.text(session, "Okay, what do we need to prepare it?");
  },
  function (session, result) {
    session.userData.preparation = result.response;
    builder.Prompts.time(session, "When should we do that?");
  },
  function (session, result) {
    session.userData.schedule = builder.EntityRecognizer.resolveTime([result.response]);
    console.log(session.userData.schedule);
    session.send("Great - sounds like a plan!");
    session.endDialog();
  }
]);

var restify = require('restify');
var server = restify.createServer();
server.post('/v1/messages', supperbot.verifyBotFramework(), supperbot.listen());
server.listen(process.env.PORT || 5000, function () {
    console.log('%s listening to %s', server.name, server.url);
});
