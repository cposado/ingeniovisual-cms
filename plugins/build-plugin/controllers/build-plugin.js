'use strict';
const { Octokit } = require('@octokit/rest');
/**
 * build-plugin.js controller
 *
 * @description: A set of functions called "actions" of the `build-plugin` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {

    // const { token } = strapi.config.get('hook.settings.github');
    const { token, owner, repo, event } = strapi.config.get('plugins.github');

    try {
      const github = await new Octokit({
        userAgent: `${strapi.config.get('info.name')} v${strapi.config.get('info.version')}`,
        auth: `token ${token}`,
      });

      // const resp = await github.users.getAuthenticated();
      const resp = await github.request(`POST /repos/${owner}/${repo}/dispatches`, {
        // owner: owner,
        // repo: repo,
        event_type: event,
      });

      // console.log(resp);
      if(resp.status === 204){
        ctx.send({
          message: 'ok'
        });
        await strapi.services['site-data'].createOrUpdate({ lastChangesPublished: true })
      } else {
        // console.log('error')
        return ctx.throw(resp.status, 'Error in github action');
      }

      // Send 200 `ok`
    } catch(e) {
      console.log(e);
      ctx.throw(e.message, 'Error in github action');
    }
  },

  status: async (ctx) => {
    // const statusDeployment = await strapi.query('deployment', 'build-plugin').findOne({ _sort: 'createdAt:desc' });
    const siteData = await strapi.services['site-data'].find()
    console.log(siteData)
    const response = {};
    if (siteData) {
      response.siteIsUpdated = siteData.lastChangesPublished;
      response.lastChange = siteData.lastChange;
    } else  {
      response.siteIsUpdated = false;
      response.lastChange = 'Unkown';
    }
    ctx.send(response)
  }
};
