var builder = require('botbuilder');
var supperbot = new builder.BotConnectorBot({ appId: process.env.APP_ID, appSecret: process.env.APP_SECRET });
var moment = require('moment');

var weeklyDinner = {
  'Monday': undefined,
  'Tuesday': undefined,
  'Wednesday': undefined,
  'Thursday': undefined,
  'Friday': undefined
};
supperbot.add('/', [
  function (session) {
    builder.Prompts.text(session,
                         "Hi! Let's plan dinners for the week!"
                        );
  }
]);

var restify = require('restify');
var server = restify.createServer();
server.post('/v1/messages', supperbot.verifyBotFramework(), supperbot.listen());
server.listen(process.env.PORT || 5000, function () {
    console.log('%s listening to %s', server.name, server.url);
});
