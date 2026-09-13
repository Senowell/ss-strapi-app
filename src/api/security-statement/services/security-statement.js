'use strict';

/**
 * security-statement service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::security-statement.security-statement');
