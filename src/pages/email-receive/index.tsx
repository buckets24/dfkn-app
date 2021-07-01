import ResetPasswordEmail from 'src/modules/auth/handlers/ResetPasswordEmail';

/**
 * TODO: Delete after development of email design
 * For development purposes only
 */
const EmailReceive = () => {
  return ResetPasswordEmail('Salutation', 'Firstname', 'Lastname', 'Email', 'Password', 'Title');
};

export default EmailReceive;
