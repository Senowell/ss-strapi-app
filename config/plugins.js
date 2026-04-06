module.exports = ({ env }) => ({
  email: {
    config: {
      provider: '@strapi/provider-email-nodemailer',
      providerOptions: {
        host:   env('SMTP_HOST', 'smtp.gmail.com'),
        port:   env.int('SMTP_PORT', 587),
        secure: env.bool('SMTP_SECURE', false), // true for port 465, false for 587
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom:    env('SMTP_FROM', env('SMTP_USERNAME')),
        defaultReplyTo: env('SMTP_FROM', env('SMTP_USERNAME')),
      },
    },
  },
});

