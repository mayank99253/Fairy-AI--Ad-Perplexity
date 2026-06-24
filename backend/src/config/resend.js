import { Resend } from 'resend';
import { ENV } from './env.js';

const resend = new Resend(ENV.RESEND_API_KEY);

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'gojo35911@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});