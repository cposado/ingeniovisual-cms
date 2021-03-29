const { Octokit } = require('@octokit/rest');

module.exports = strapi => {
  return {
    async initialize() {
      console.log('Octokit github hook')
      const { token } = strapi.config.get('hook.settings.github');

      strapi.services.github = await new Octokit({
        userAgent: `${strapi.config.get('info.name')} v${strapi.config.get('info.version')}`,
        auth: `token ${token}`,
      });
    },
  };
};