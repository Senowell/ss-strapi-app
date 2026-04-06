'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::contact-submission.contact-submission',
  ({ strapi }) => ({

    async create(ctx) {
      const { firstName, lastName, email, phone, areaOfInterest, message, newsletter } =
        ctx.request.body?.data ?? {};

      // ── Validate required fields ──────────────────────────────
      const missing = [];
      if (!firstName?.trim()) missing.push('firstName');
      if (!lastName?.trim())  missing.push('lastName');
      if (!email?.trim())     missing.push('email');
      if (!areaOfInterest)    missing.push('areaOfInterest');
      if (!message?.trim())   missing.push('message');

      if (missing.length) {
        return ctx.badRequest('Missing required fields', { missing });
      }

      // ── Persist entry ─────────────────────────────────────────
      let entry;
      try {
        entry = await strapi.entityService.create(
          'api::contact-submission.contact-submission',
          {
            data: {
              firstName: firstName.trim(),
              lastName:  lastName.trim(),
              email:     email.trim().toLowerCase(),
              phone:     phone?.trim() || null,
              areaOfInterest,
              message:   message.trim(),
              newsletter: !!newsletter,
            },
          }
        );
      } catch (err) {
        strapi.log.error('Contact submission DB error:', err);
        return ctx.internalServerError('Failed to save submission');
      }

      // ── Send emails ───────────────────────────────────────────
      const emailService = strapi.plugins['email']?.services?.email;

      if (emailService) {
        try {
          // Email #1 – confirmation to the user
          await emailService.send({
            to:      email.trim(),
            subject: 'We received your request',
            text: `Hi ${firstName},\n\nThank you for reaching out to Senowell Systems. We have received your enquiry and a member of our support team will get back to you shortly.\n\nBest regards,\nSenowell Systems Team`,
            html: `
              <p>Hi <strong>${firstName}</strong>,</p>
              <p>Thank you for reaching out to <strong>Senowell Systems</strong>. We have received your enquiry and a member of our support team will get back to you shortly.</p>
              <p>Best regards,<br/>Senowell Systems Team</p>
            `,
          });

          // Email #2 – notification to support team
          await emailService.send({
            to:      'support@senowell.systems',
            subject: 'New Contact Form Submission',
            text: `New contact form submission:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nArea of Interest: ${areaOfInterest}\nNewsletter: ${newsletter ? 'Yes' : 'No'}\n\nMessage:\n${message}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <table>
                <tr><td><strong>Name</strong></td><td>${firstName} ${lastName}</td></tr>
                <tr><td><strong>Email</strong></td><td>${email}</td></tr>
                <tr><td><strong>Phone</strong></td><td>${phone || 'N/A'}</td></tr>
                <tr><td><strong>Area of Interest</strong></td><td>${areaOfInterest}</td></tr>
                <tr><td><strong>Newsletter</strong></td><td>${newsletter ? 'Yes' : 'No'}</td></tr>
              </table>
              <h3>Message</h3>
              <p>${message.replace(/\n/g, '<br/>')}</p>
            `,
          });
        } catch (emailErr) {
          // Log but don't fail the request — entry is already saved
          strapi.log.error('Contact submission email error:', emailErr);
        }
      }

      return ctx.created({ data: entry });
    },

  })
);
