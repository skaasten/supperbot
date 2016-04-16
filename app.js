var builder = require('botbuilder');
var supperbot = new builder.TextBot();

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
supperbot.listenStdin();