const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.sendEmail = ({from, to, subject, text, html}) => {
  const msg = {from, to, subject, text, html}
  sgMail.send(msg);
}