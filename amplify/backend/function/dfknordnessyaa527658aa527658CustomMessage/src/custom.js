exports.handler = (event, context, callback) => {
  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    // Ensure that your message contains event.request.codeParameter event.request.usernameParameter. This is the placeholder for the code and username that will be sent to your user.
    event.response = {
      emailSubject: `Ihr Bestätigungscode für Nessy Cloud by DFK Nord AG`,
      emailMessage: /* HTML */ `<body>
        <p style="color: black;">Sie haben eine Passwort-Vergessen-Funktion ausgelöst.</p>
        <p style="color: black;">Hier ist Ihr Bestätigungscode:</p>
        <h3 style="font-size: 32px; color: #5771DB; margin: 8px 0;">${event.request.codeParameter}</h3>

        <p style="color: black;">Ihr DFK Nord AG Team.</p>
      </body>`,
    };
  }
  callback(null, event);
};
