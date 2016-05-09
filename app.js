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
var commandDialog = new builder.CommandDialog()
      .matches('^week', '/week')
      .matches('^help', '/help')
      .onDefault(builder.DialogAction.send("Sorry, I didn't get that"));

supperbot.add('/', commandDialog)
  .add('/week', function(session) {
    session.send("Here are the meals for this week:");
    session.endDialog();
  })
  .add('/help', function(session) {
    session.send("Here are some commands:\n" +
                 "    week: show meals for the week");
    session.endDialog();
  });

var restify = require('restify');
var server = restify.createServer();
server.post('/v1/messages', supperbot.verifyBotFramework(), supperbot.listen());
server.listen(process.env.PORT || 5000, function () {
    console.log('%s listening to %s', server.name, server.url);
});
